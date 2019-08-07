const { UserInputError } = require('apollo-server-express');
const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const postNotFoundError = 'post not found';
const commentNotFoundError = 'comment not found';

const buildError = (errorMessage) => {
  const errors = [];
  errors.push(errorMessage);
  return new UserInputError('Invalid input(s)', { errors });
};

const doAddComment = (post, comment) => {
  if (!post) {
    throw buildError(postNotFoundError);
  }
  comment.createdOn = Date.now();
  post.comments.push(comment);
  console.log(post);
  return post.save()
    .then(p => Promise.resolve(p.comments.pop()));
};

const addComment = (_, { postId, comment }) => Post.findById(postId)
  .select('comments')
  .then(post => doAddComment(post, comment));

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

module.exports = { addComment, deleteComment };
