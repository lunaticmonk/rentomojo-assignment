"use strict";

const express = require("express");
const router = express.Router();

const { body, query } = require("express-validator/check");

const { registerUser, logInUser } = require("../controllers/user");

router.get("/", (req, res) => {
  res.status(200).send("User Resource");
});

router.post(
  "/register",
  [
    body("username")
      .exists()
      .trim()
      .withMessage("username is required"),
    body("email")
      .exists()
      .trim()
      .optional()
      .isEmail()
      .withMessage("email is required and should be in correct format"),
    body("password")
      .exists()
      .trim()
      .withMessage("password is required"),
    body("name")
      .exists()
      .trim()
      .optional()
      .withMessage("name is required")
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("username")
      .exists()
      .trim()
      .withMessage("username is required"),
    body("password")
      .exists()
      .trim()
      .withMessage("password is required")
  ],
  logInUser
);

module.exports = router;
