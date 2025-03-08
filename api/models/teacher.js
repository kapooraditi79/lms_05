import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
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
    teacherId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      //required: true,
    },
  },
  { timestamps: true }
);

const TeacherModel = mongoose.model("teacher", teacherSchema);

export default TeacherModel;
