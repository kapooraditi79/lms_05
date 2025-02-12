const mongoose = require("mongoose");
const FeeComponent = require("./feeComponent");

const studentFeeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  feeStructure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "feeStructure",
    required: true,
  },
  feeComponents: [
    {
      component: { type: mongoose.Schema.Types.ObjectId, ref: "FeeComponent" },
      amount: { type: Number, required: true }, // Allows modifying student-specific amounts
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  amountDue: {
    type: Number,
  },
  feeCycle: {
    startMonth: {
      type: String,
      required: true,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    endMonth: {
      type: String,
      required: true,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },
  payments: [
    {
      date: { type: Date, default: Date.now },
      amount: { type: Number, required: true },
    },
  ],
});

studentFeeSchema.pre("validate", async function (next) {
  for (const feeComponent of this.feeComponents) {
    if (!feeComponent.amount) {
      const component = await FeeComponent.findById(feeComponent.component);
      feeComponent.amount = component.amount;
    }
  }

  this.totalAmount = this.feeComponents.reduce(function (sum, component) {
    sum += component.amount;
  }, 0);
  next();
});

module.exports = mongoose.model("studentFee", studentFeeSchema);
