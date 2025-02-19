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
  periodicity: {
    type: String,
    enum: ["monthly", "quarterly", "half-yearly", "annually"],
    required: true,
  },
});

module.exports = mongoose.model("feeComponent", feeComponentSchema);
