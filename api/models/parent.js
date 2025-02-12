const mongoose = require("mongoose");
import student from "./student";

const parentSchema = new mongoose.Schema({
  studentName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "school",
  },

  fatherName: {
    type: String,
    required: true,
  },
  fatherMobile: {
    type: Number,
    required: true,
  },
  fatherEmail: {
    type: String,
    required: true,
    unique: true, // Ensures emails are unique
  },

  motherName: {
    type: String,
    required: true,
  },
  motherNumber: {
    type: Number,
    required: true,
  },
  guardianName: {
    type: String,
  },
  guardianNumber: {
    type: Number,
  },

  address: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: Number,
  },
});

module.exports = mongoose.model("parent", parentSchema);
