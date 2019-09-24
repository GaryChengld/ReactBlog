const { UserInputError } = require('apollo-server-express');
const mongoose = require('mongoose');
const { mustBeSignedIn } = require('../auth.js');

const Post = mongoose.model('Post');
const postNotFoundError = 'post not found';
const commentNotFoundError = 'comment not found';

const buildError = (errorMessage) => {
  const errors = [];
  errors.push(errorMessage);
  return new UserInputError('Invalid input(s)', { errors });
};

const doAddComment = (post, comment, user) => {
  const theComment = {
    ...comment,
    author: user.name,
    createdOn: Date.now(),
  };
  console.log(theComment);
  if (!post) {
    throw buildError(postNotFoundError);
  }
  // return Post.findByIdAndUpdate(post._id, { $push: { comments: theComment } })
  //  .then(p => Promise.resolve(p.comments.pop()));
  post.comments.push(theComment);
  return post.save()
    .then(p => Promise.resolve(p.comments.pop()));
};

const addComment = (_, { postId, comment }, { user }) => Post.findById(postId)
  .select('comments')
  .then(post => doAddComment(post, comment, user));


const doDeleteComment = (post, commentId) => {
  if (!post) {
    throw buildError(postNotFoundError);
  }
  if (!post.comments.id(commentId)) {
    throw buildError(commentNotFoundError);
  }
  post.comments.id(commentId).remove();
  return post.save();
};

const deleteComment = (_, { postId, commentId }) => Post.findById(postId)
  .then(post => doDeleteComment(post, commentId));

module.exports = {
  addComment: mustBeSignedIn(addComment),
  deleteComment: mustBeSignedIn(deleteComment),
};
