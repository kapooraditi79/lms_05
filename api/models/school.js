import mongoose from "mongoose";
const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  principal: {
    type: String,
    required: true,
  },
  // feeStructure: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "feeStructure",
  // },
});

module.exports = mongoose.model("school", schoolSchema);
