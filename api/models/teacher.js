import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true, // Ensures emails are unique
  },
  salary: {
    type: Number,
  },
  // subjects: [
  //   {
  //     type: String
  //   }
  // ],
  // school: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "school",
  // },
  // class: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "class",
  //   },
  // ],
});

module.exports = mongoose.model("teacher", teacherSchema);
