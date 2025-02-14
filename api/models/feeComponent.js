import mongoose from "mongoose";

const feeComponentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("feeComponent", feeComponentSchema);
