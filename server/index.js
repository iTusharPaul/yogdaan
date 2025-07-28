const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();

const app = express();
require("./passport"); // we'll create this next

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(session({
  secret: "session_secret",
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB
mongoose.connect("mongodb+srv://tusharstudy143:privacy%401234@cluster0.b9dad.mongodb.net/Yogdaan");

// Routes
app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
