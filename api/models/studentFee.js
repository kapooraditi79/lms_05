import mongoose from "mongoose";


const studentFeeSchema = new mongoose.Schema({
  feeComponents: [
    {
      component: { type: mongoose.Schema.Types.ObjectId, ref: "FeeComponent" },
      amount: { type: Number, required: true }, // Allows modifying student-specific amounts
    },
  ],
    congessionComponents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "congessionComponent",
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "payments",
    },
  ],
  // student: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "student",
  //   required: true,
  // },
  // feeStructure: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "feeStructure",
  //   required: true,
  // },
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
