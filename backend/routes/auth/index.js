const express = require("express");
const router = express.Router();
const passport = require("passport");
const keys = require("../../config/keys");
const Car = require("../../lib/db/schemas/car");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: keys.app.front,
    failureRedirect: "/google",
  }),
  (req, res) => {
    res.send("redirect");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(keys.app.front);
});

router.get("/user", async (req, res) => {
  if (req.user) {
    const ownedCars = await Car.find({ user_id: req.user.id });
    let ownerCarNums = [];
    if (ownedCars && ownedCars.length > 0) {
      ownedCars.forEach((car) => ownerCarNums.push(car.number));
    }

    const user = req.user;
    res.status(200).json({ user, ownedCars: ownerCarNums });
  } else res.status(403).json({ message: "youre not logged in" });
});

module.exports = router;
