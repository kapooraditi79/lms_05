const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "school",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,

    unique: true, // Ensures emails are unique
  },
  class: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
    },
  ],
  salary: {
    type: Number,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subjects",
    },
  ],
});

module.exports = mongoose.model("teacher", teacherSchema);
