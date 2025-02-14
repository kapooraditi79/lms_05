import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  session: {
    type: Number,
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
});

module.exports = mongoose.model("class", classSchema);
