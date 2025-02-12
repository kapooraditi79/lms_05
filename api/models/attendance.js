const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "class",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["present", "absent"], // Attendance status
    required: true,
  },
  remarks: {
    type: String, // Optional remarks (e.g., reason for absence)
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "school",
    required: true,
  },
});

module.exports = mongoose.model("attendance", attendanceSchema);
