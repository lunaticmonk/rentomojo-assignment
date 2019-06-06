"use strict";

const express = require("express");
const router = express.Router();

const {
  getAllComments,
  createComment,
  getComment
} = require("../controllers/comment");

const { body, header } = require("express-validator/check");

router.get("/", (req, res) => {
  res.status(200).send("Comment Resource");
});

router.post(
  "/create",
  [
    body("value")
      .exists()
      .trim()
      .withMessage("comment value is required"),
    header("access-token")
      .exists()
      .trim()
      .withMessage("accessToken is required")
  ],
  createComment
);

router.get("/:id", getComment);

router.get("/all", getAllComments);

module.exports = router;
