"use strict";

const express = require("express");
const router = express.Router();

const { getAllComments } = require("../controllers/comment");

router.get("/", (req, res) => {
  res.status(200).send("Comment Resource");
});

router.get("/all", getAllComments);

module.exports = router;
