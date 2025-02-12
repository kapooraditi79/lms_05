const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  session: {
    type: Number,
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "school",
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
  feeStructure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "feeStructure",
  },
});

module.exports = mongoose.model("class", classSchema);
