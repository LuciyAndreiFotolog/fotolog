const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true
    },
    logId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Log',
      required: true
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    username: {
      type: mongoose.SchemaTypes.String,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;