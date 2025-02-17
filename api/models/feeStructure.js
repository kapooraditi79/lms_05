import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema({
  feeComponents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "feeComponent",
    },
  ],
  // congessionComponents: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "congessionComponent",
  //   },
  // ],
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "school",
  },
  // class: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "class",
  // },
  // session: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "session",
  // },
});

module.exports = mongoose.model("feeStructure", feeStructureSchema);
