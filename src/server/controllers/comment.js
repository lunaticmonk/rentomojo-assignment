/**
 * Comment controller.
 * Contains all the business logic executed after
 * hitting any comment endpoint in routes.
 *
 */

"use strict";

const Comment = require("../models/comment");

const ApiError = require("../errors/api");

async function getAllComments(req, res, next) {
  try {
    const comments = await Comment.find({});

    const response = {
      data: comments,
      message: `Comments returned successfully`,
      status: 200
    };

    return res.status(response.status).send(response);
  } catch (error) {
    const err = new ApiError(`Unable to find the comments`);
    return res.status(err.status).send(err);
  }
}

module.exports = {
  getAllComments
};
