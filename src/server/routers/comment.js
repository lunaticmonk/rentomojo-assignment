"use strict";

const express = require("express");
const router = express.Router();

const {
  getAllComments,
  createComment,
  getComment,
  upvoteComment,
  downvoteComment
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

router.get("/all", getAllComments);

router.get("/:id", getComment);

router.get(
  "/:id/upvote",
  [
    header("access-token")
      .exists()
      .trim()
      .withMessage("accessToken is required")
  ],
  upvoteComment
);

router.get(
  "/:id/downvote",
  [
    header("access-token")
      .exists()
      .trim()
      .withMessage("accessToken is required")
  ],
  downvoteComment
);

module.exports = router;
