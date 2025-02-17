import mongoose from "mongoose";

const concessionComponentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("concessionComponent", concessionComponentSchema);
