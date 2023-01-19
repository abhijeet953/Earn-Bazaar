const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    id:{
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    reward: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    guest: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    userCategory:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
