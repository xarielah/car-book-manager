const express = require("express");
const router = express.Router();
const isCarMine = require("../../lib/utils/is-car-mine");
const Record = require("../../lib/db/schemas/record");

router.get("/:id", isCarMine, async (req, res) => {
  console.log("🚀 ~ file: index.js:6 ~ router.get ~ req:", req.car);
  const records = await Record.find({ car_id: req.car.id });

  res
    .status(200)
    .json({
      count: records.length,
      records: records,
      carNumber: req.car.number,
    });
});

router.post("/new", isCarMine, async (req, res) => {
  const newRecordData = {
    car_id: req.body.car_id,
    type: req.body.type,
    description: req.body.description,
    milage: req.body.milage,
  };

  try {
    const newlyRecord = await new Record(newRecordData).save();
    res.status(200).json({
      message: `Record id \"${newlyRecord._id}\" for car id \"${newlyRecord.car_id}\" was created successfuly.`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
