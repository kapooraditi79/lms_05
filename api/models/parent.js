import mongoose, { model } from "mongoose";

const parentSchema = new mongoose.Schema({
  fatherName: {
    type: String,
    required: true,
  },
  fatherMobile: {
    type: String,
    required: true,
  },
  fatherEmail: {
    type: String,
    required: true,
    unique: true, // Ensures emails are unique
  },
  motherName: {
    type: String,
    required: true,
  },
  motherNumber: {
    type: String,
    required: true,
  },
  guardianName: {
    type: String,
  },
  guardianNumber: {
    type: String,
  },

  address: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  // studentName: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "student",
  // },
  // school: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "school",
  // },
});
const parentModel=model('parent',parentSchema);
export default parentModel;