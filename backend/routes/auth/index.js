const express = require("express");
const router = express.Router();
const passport = require("passport");
const keys = require("../../config/keys");

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

router.get("/user", (req, res) => {
  if (req.user) res.status(200).json(req.user);
  else res.status(403).json({ message: "youre not logged in" });
});

module.exports = router;
