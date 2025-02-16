import mongoose, { model } from "mongoose";

const classSchema = new mongoose.Schema(
  {
    session: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    teacher: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
      },
    ],
    student: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
      },
    ],
    // school: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "school",
    // },
    // feeStructure: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "feeStructure",
    // },
  },
  { timestamps: true }
);
const classModel = model("class", classSchema);
export default classModel;
