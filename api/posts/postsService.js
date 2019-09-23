const mongoose = require('mongoose');
const { mustBeSignedIn } = require('../auth.js');

const Post = mongoose.model('Post');

const latestPosts = (_, { limit }) => {
  console.log(`latest posts, limit:${limit}`);
  return Post.find().sort({ createdOn: 'desc' })
    .limit(limit);
};

const findById = (_, { id }) => {
  console.log(`find post by id, id=${id}`);
  return Post.findById(id);
};

const findByAuthor = (author) => {
  console.log(`find post by author, author=${author}`);
  return Post.find({ author })
    .select('id title tags');
};

const createPost = (_, { post }, { user }) => {
  console.log('create a new post');
  const thePost = {
    ...post,
    author: user.name,
    createdOn: Date.now(),
  };
  return Post.create(thePost);
};

const updatePost = (_, { id, post }) => {
  console.log(`update a post, post id=${id}`);
  console.log(post);
  return Post.findByIdAndUpdate(id, { $set: { ...post, updatedOn: Date.now() } });
};

const removePost = (_, { id }) => {
  console.log(`remove a post, post id=${id}`);
  return Post.findByIdAndRemove(id).then(() => Promise.resolve(true));
};

const searchPosts = (_, { text }) => {
  console.log(`search by text, keyword=${text}`);
  return Post.find(
    { $text: { $search: text } },
    { score: { $meta: 'textScore' } },
  )
    .sort({ score: { $meta: 'textScore' } });
};

module.exports = {
  latestPosts,
  findById,
  findByAuthor,
  createPost: mustBeSignedIn(createPost),
  updatePost: mustBeSignedIn(updatePost),
  removePost: mustBeSignedIn(removePost),
  searchPosts,
};
