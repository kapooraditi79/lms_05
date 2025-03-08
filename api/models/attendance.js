import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    attendanceStatus: {
      type: String,
      enum: ["present", "absent"], // Attendance status
      required: true,
    },
    remarks: {
      type: String, // Optional remarks (e.g., reason for absence)
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
      required: true,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("attendance", attendanceSchema);
export default mongoose.model("attendance", attendanceSchema);
