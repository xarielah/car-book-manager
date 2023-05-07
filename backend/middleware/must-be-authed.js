module.exports = (req, res, next) => {
  if (!req.user) {
    return res
      .status(403)
      .json({ message: "You must be authenticated to do that." });
  }
  next();
};
