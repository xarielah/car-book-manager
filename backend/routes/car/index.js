const express = require("express");
const router = express.Router();
const Car = require("../../lib/db/schemas/car");
const isCarMine = require("../../lib/utils/is-car-mine");

router.post("/add-new-car", (req, res) => {
  const motUri = (carNumber) =>
    `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&filters={%22mispar_rechev%22:%22${carNumber}%22}`;

  if (!req.body.car)
    return res.status(400).json({ message: "car number is missing" });
  if (req.body.car.length < 7 || req.body.car.length > 8)
    return res.status(400).json({ message: "car number must be 7-8 digits" });

  fetch(motUri(req.body.car))
    .then((res) => res.json())
    .then((data) => {
      if (data.result.total > 0) {
        Car.findOne({
          number: req.body.car,
          user_id: req.user.id,
        })
          .then((foundCar) => {
            if (foundCar) {
              return res
                .status(400)
                .json({ message: "You already own this car" });
            } else {
              new Car({
                number: req.body.car,
                user_id: req.user.id,
              })
                .save()
                .then((newCar) =>
                  res.status(200).json({
                    message: `Car number ${newCar.number} was registered to user id ${newCar.user_id}`,
                  })
                );
            }
          })
          .catch((_) =>
            res.status(500).json({
              message: "There was an error trying to register the car to you",
            })
          );
      }
    });

  console.log(req.body);
});

router.get("/user-cars", (req, res) => {
  Car.find({ user_id: req.user.id })
    .then((data) => {
      return res.status(200).json({ count: data.length, cars: data });
    })
    .catch((_) =>
      res
        .status(500)
        .json({ message: "There was an error trying to fetch your cars" })
    );
});

router.get("/:id", isCarMine, async (req, res) => {
  res.status(200).json({ car: req.car });
});

router.delete("/:id", isCarMine, async (req, res) => {
  const deletedCar = await Car.findByIdAndDelete(req.car.id);
  console.log(
    "🚀 ~ file: index.js:70 ~ router.delete ~ deletedCar:",
    deletedCar
  );

  res
    .status(200)
    .json({
      message: `Car id \"${deletedCar._id}\" was deleted from user id \"${deletedCar.user_id}\"'s ownership.`,
    });
});

module.exports = router;
