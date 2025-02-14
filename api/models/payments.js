import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
  },
});

module.exports = mongoose.model("payments", paymentSchema);
