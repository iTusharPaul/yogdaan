const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/" }), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
});

module.exports = router;
