import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  bookIssueDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  bookReturnDate: {
    type: Date,
    default: Date.now,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "school",
  },
  authorName: {
    type: String,
  },
  status: {
    type: String,
    enum: ["issued", "available", "torn", "removed", "lost"], // Ensures only these values are allowed
  },
});

module.exports = mongoose.model("library", librarySchema);
