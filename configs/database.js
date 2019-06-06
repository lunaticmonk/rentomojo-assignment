"use strict";

const dotenv = require("dotenv");
dotenv.config();

const { DATABASE_USER, DATABASE_PASSWORD } = process.env;

const configs = {
  DATABASE_USER,
  DATABASE_PASSWORD
};

module.exports = configs;
