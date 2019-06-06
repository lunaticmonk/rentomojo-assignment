/**
 * Comment controller.
 * Contains all the business logic executed after
 * hitting any comment endpoint in routes.
 *
 */

"use strict";

const User = require("../models/user");
const Comment = require("../models/comment");

const { validationResult } = require("express-validator/check");

const { getUserFromAccessToken } = require("./user");

const ApiError = require("../errors/api");
const UnprocessableRequestError = require("../errors/unprocessablerequest");

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

async function createComment(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new UnprocessableRequestError(err.mapped()));
  }
  try {
    const { value } = req.body;

    const accessToken = req.header("access-token");
    const user = await getUserFromAccessToken(accessToken);

    const newComment = new Comment({
      value,
      author: user._id
    });

    const comment = await newComment.save();

    const response = {
      data: comment,
      message: `Comments saved successfully`,
      status: 200
    };

    return res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    const err = new ApiError(`Unable to save the comment`);
    return res.status(err.status).send(err);
  }
}

async function getComment(req, res, next) {
  try {
    const { id: commentId } = req.params;

    const comment = await Comment.findOne({ _id: commentId }).populate(
      "author",
      "username"
    );

    const response = {
      data: comment,
      message: `Comment returned successfully`,
      status: 200
    };

    return res.status(response.status).send(response);
  } catch (error) {
    const err = new ApiError(`Unable to find the comment`);
    return res.status(err.status).send(err);
  }
}

async function upvoteComment(req, res, next) {
  try {
    const { id: commentId } = req.params;
	const accessToken = req.header("access-token");

    const user = await getUserFromAccessToken(accessToken);
    const { _id: userId } = user;

    const comment = await Comment.findOne({ _id: commentId });

    if (comment.upvotes.includes(userId)) {
      const response = {
        message: `User has already upvoted`,
        status: 200
      };

      return res.status(response.status).send(response);
    }

    comment.upvotes.push(userId);
    const _comment = await comment.save();

    const response = {
      data: _comment,
      message: `Upvoted successfully`,
      status: 200
    };

    return res.status(response.status).send(response);
  } catch (error) {
    const err = new ApiError(`Unable to upvote the comment`);
    return res.status(err.status).send(err);
  }
}

module.exports = {
  getAllComments,
  createComment,
  getComment,
  upvoteComment
};
