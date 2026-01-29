const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true
    // },
    userSid: {
      type: String,
      required: true,
      index: true
    },


    customizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customization",
      required: true
    },

    customization_number: String, // copy from customization (safe)

    amount: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      default: "INR"
    },

    status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING"
    },

    invoiceNumber: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
