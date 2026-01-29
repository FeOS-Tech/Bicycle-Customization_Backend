const Counter = require("../models/Counter");

const generateInvoiceNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "invoice" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return `ITINV${String(counter.seq).padStart(6, "0")}`;
};

module.exports = generateInvoiceNumber;
