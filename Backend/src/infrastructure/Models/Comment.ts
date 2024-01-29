import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  blogId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
