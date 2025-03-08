import mongoose, { model } from "mongoose";

const parentDataSchema = new mongoose.Schema({
  fatherName: { type: String, required: true },
  fatherPhone: { type: String, required: true },
  fatherEmail: { type: String, required: true },
  motherName: { type: String, required: true },
  motherPhone: { type: String, required: true },
  motherEmail: { type: String, required: true },
  fatherImage: { type: String, required: false },
  motherImage: { type: String, required: false },
});

const studentSchema = new mongoose.Schema(
  {
    session: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    regNo: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    studentClass: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    joinedOn: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    grade: {
      type: String,
    },
    profileImage: {
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
    parentData: parentDataSchema,
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
