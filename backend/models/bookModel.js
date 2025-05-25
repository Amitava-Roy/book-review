// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
    minlength: [2, "Book title must be at least 2 characters long"],
    maxlength: [100, "Book title must not exceed 100 characters"],
  },
  shortDescription: {
    type: String,
    required: [true, "Short description is required"],
    trim: true,
    minlength: [10, "Short description must be at least 10 characters long"],
    maxlength: [500, "Short description must not exceed 300 characters"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author (User ID) is required"],
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  thumbnailUrl: {
    type: String,
  },
  genre: {
    type: String,
    trim: true,
    enum: {
      values: [
        "Fiction",
        "Non-fiction",
        "Fantasy",
        "Science",
        "Biography",
        "Other",
      ],
      message:
        "Genre must be one of: Fiction, Non-fiction, Fantasy, Science, Biography, Other",
    },
  },
});

module.exports = mongoose.model("Book", bookSchema);
