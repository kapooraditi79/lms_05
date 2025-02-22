import mongoose, { model } from "mongoose";

const classSchema = new mongoose.Schema(
  {
    session: {
      type: String,
      required: true,
    },
    regNo:{
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    section:{
      type:String,
      required:true
    },
    status:{
      type: String,
      required: true,
    },
    noOfStudent:{
      type:Number,
      required:true
    },
    noOfSubjects:{
      type:Number,
      required:true
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
  },
  { timestamps: true }
);
const classModel = model("class", classSchema);
export default classModel;
