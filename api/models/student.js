const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  session: {
    type: Number,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "school",
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
    //required: true,
  },
  parentName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "parent",
  },
  aadhar_number: {
    type: Number,
  },
  address: {
    type: String,
  },
  fees: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fees",
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "class",
  },
  examination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "exam",
  },
  certificate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "certificate",
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
});

module.exports = mongoose.model("student", studentSchema);
