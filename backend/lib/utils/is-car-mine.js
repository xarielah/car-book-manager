const Car = require("../db/schemas/car");
const doLog = require("./logger");

module.exports = async function (req, res, next) {
  const carId = req.params.id || req.body.car_id;
  const user = req.user;

  if (!user)
    return res
      .status(403)
      .json({ message: "You must be logged in to do this." });

  if (!carId)
    return res
      .status(400)
      .json({ message: "Car id is missing, please provide a valid car id." });

  const foundCar = await Car.findById(carId).catch((_) =>
    doLog("Error fetching car: " + carId)
  );
  if (!foundCar)
    return res
      .status(404)
      .json({ message: `Car with id \"${carId}\" was not found` });

  if (foundCar.user_id !== user.id)
    return res
      .status(403)
      .json({ message: "You cannot do actions on car you do not own." });

  req.car = foundCar;
  next();
};
