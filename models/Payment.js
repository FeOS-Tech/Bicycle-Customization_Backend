const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },

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


    gateway: {
      type: String,
      default: "Worldpay"
    },

    paymentMethod: String, // VISA / MASTER

    transactionId: String,

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      required: true
    },

    paidAmount: Number,
    currency: String,

    paidAt: Date,
    invoiceNumber: {
      type: String,
      required: true
    },

    rawResponse: Object
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
