"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./user");

const commentSchema = Schema(
  {
    value: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    upvotes: {
      type: Number,
      required: false
    },
    downvotes: {
      type: Number,
      required: false
    }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
