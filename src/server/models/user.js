"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: [
      {
        type: Number,
        required: true
      }
    ]
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
