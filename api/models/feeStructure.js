const mongoose = require("mongoose");

const feeStructureSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "class",
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "session",
  },
  feeComponents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "feeComponent",
    },
  ],
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "school",
  },
});

module.exports = mongoose.model("feeStructure", feeStructureSchema);
