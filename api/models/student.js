import mongoose, { model } from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    session: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
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
    // examination: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "exam",
    // },
    // certificate: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "certificate",
    // },
    // fees: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "fees",
    // },
    // class: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "class",
    // },
    // school: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "school",
    // },
  },
  { timestamps: true }
);

const studentModel = model("student", studentSchema);
export default studentModel;
