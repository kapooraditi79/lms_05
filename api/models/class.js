import mongoose, { model } from "mongoose";

const studentClassSchema = new mongoose.Schema(
  {
    session: {
      type: String,
      required: true,
    },
    studentClassName: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
      },
    ],
  },
  { timestamps: true }
);
const studentClassModel = model("studentClass", studentClassSchema);
export default studentClassModel;
