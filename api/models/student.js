import mongoose, { model } from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    session: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    regNo:{
      type: String,
      required: true,
    },
    rollNo:{
      type: String,
      required: true,
    },
    gender:{
      type: String,
      required: true,
    },
    class:{
      type: String,
      required: true,
    },
    section:{
      type: String,
      required: true,
    },
    status: { 
      type: String, enum: ["Active", "Inactive"], default: "Active" 
    },
    grade:{
      type: String,
    },
    profileImage:{
      type: String,
      // required: true,
    },
    age: {
      type: Number,
      // required: true,
    },
    dob: {
      type: Date,
      // required: true,
    },
    parentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "parent",
    },
    aadhar_number: {
      type: String,
    },
    address: {
      type: String,
    },
    transport: {
      type: String,
    },
    attendance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "attendance",
    },
    studentFee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studentFee",
    },
  },
  { timestamps: true }
);

const studentModel = model("student", studentSchema);
export default studentModel;
