const mongoose = require('mongoose');

const logSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true
    },
    tags: {
      type: [String],
    }
  }, 
  {
    timestamps: true
  }
);

logSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'logId',
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;