const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    log: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Log',
      required: true
    }
  }
);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;