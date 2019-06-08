"use strict";

const express = require("express");
const router = express.Router();

const { isAuthorized } = require("../policies/policy");

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
  isAuthorized,
  createComment
);

router.get("/all", getAllComments);

router.get("/:id", getComment);

router.patch(
  "/:id/upvote",
  [
    header("access-token")
      .exists()
      .trim()
      .withMessage("accessToken is required")
  ],
  isAuthorized,
  upvoteComment
);

router.patch(
  "/:id/downvote",
  [
    header("access-token")
      .exists()
      .trim()
      .withMessage("accessToken is required")
  ],
  isAuthorized,
  downvoteComment
);

module.exports = router;
