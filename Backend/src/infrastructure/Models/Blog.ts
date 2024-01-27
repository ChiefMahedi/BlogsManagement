import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
