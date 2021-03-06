const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: String, require: true },
  comment: { type: String, require: true },
  createdOn: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  author: { type: String, require: true },
  title: { type: String, require: true },
  body: { type: String, require: true },
  tags: [String],
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
  comments: [commentSchema],
}, { collation: 'Posts' });

postSchema.index(
  {
    title: 'text',
    author: 'text',
    body: 'text',
  },
  {

    weights: {
      author: 5,
      title: 4,
      body: 2,
    },
  },
);

mongoose.model('Post', postSchema);
