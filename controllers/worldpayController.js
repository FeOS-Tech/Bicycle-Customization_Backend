// const Order = require("../models/Order");
// const Payment = require("../models/Payment");
// const generateInvoiceNumber = require("../utils/invoiceGenerator");
// const { decryptWorldlineResponse } = require("../utils/worldlineDecrypt");
// const crypto = require("crypto");


// // exports.worldpaySuccess = async (req, res) => {
// //   try {
// //     const {
// //       cartId,
// //       amount,
// //       currency,
// //       transId,
// //       paymentMethod
// //     } = req.body;

// //     const orderId = cartId.replace("ORDER_", "");
// //     const order = await Order.findById(orderId);

// //     if (!order) {
// //       return res.redirect("/payment-failed");
// //     }

// //     // ✅ Idempotent
// //     if (order.status === "PAID") {
// //       return res.redirect(`/payment-success?invoice=${order.invoiceNumber}`);
// //     }

// //     // Generate invoice
// //     const invoiceNumber = await generateInvoiceNumber();

// //     order.status = "PAID";
// //     order.invoiceNumber = invoiceNumber;
// //     await order.save();

// //     await Payment.create({
// //       orderId: order._id,
// //       userId: order.userId,
// //       gateway: "Worldpay",
// //       paymentMethod,
// //       transactionId: transId,
// //       status: "SUCCESS",
// //       paidAmount: amount / 100,
// //       currency,
// //       paidAt: new Date(),
// //       rawResponse: req.body
// //     });

// //     res.redirect(`/payment-success?invoice=${invoiceNumber}`);

// //   } catch (err) {
// //     console.error(err);
// //     res.redirect("/payment-failed");
// //   }
// // };
// exports.worldpaySuccess = async (req, res) => {
//   try {
//     const encData = req.body.encData || req.query.encData;
//     if (!encData) return res.redirect("/payment-failed");

//     const decrypted = decryptWorldlineResponse(encData);

//     const response = Object.fromEntries(
//       decrypted.split("&").map(kv => kv.split("="))
//     );

//     const { cartId, amount, currency, transId, paymentMethod, status } = response;

//     if (status !== "SUCCESS") return res.redirect("/payment-failed");

//     const orderId = cartId.replace("ORDER_", "");
//     const order = await Order.findById(orderId);

//     if (!order) return res.redirect("/payment-failed");

//     if (order.status === "PAID") {
//       return res.redirect(`/payment-success?invoice=${order.invoiceNumber}`);
//     }

//     const invoiceNumber = await generateInvoiceNumber();

//     order.status = "PAID";
//     order.invoiceNumber = invoiceNumber;
//     await order.save();

//     await Payment.create({
//       orderId: order._id,
//       invoiceNumber: invoiceNumber,
//       userId: order.userId,
//       gateway: "Worldline",
//       paymentMethod,
//       transactionId: transId,
//       status: "SUCCESS",
//       paidAmount: Number(amount) / 100,
//       currency,
//       paidAt: new Date(),
//       rawResponse: decrypted
//     });

//     res.redirect(`/payment-success?invoice=${invoiceNumber}`);

//   } catch (err) {
//     console.error(err);
//     res.redirect("/payment-failed");
//   }
// };


// // exports.worldpayFailure = async (req, res) => {
// //   try {
// //     const { cartId } = req.body;

// //     const orderId = cartId.replace("ORDER_", "");
// //     const order = await Order.findById(orderId);

// //     if (order && order.status !== "PAID") {
// //       order.status = "FAILED";
// //       await order.save();
// //     }

// //     res.redirect("/payment-failed");

// //   } catch (err) {
// //     console.error(err);
// //     res.redirect("/payment-failed");
// //   }
// // };
// exports.worldpayFailure = async (req, res) => {
//   try {
//     const encData = req.body.encData || req.query.encData;
//     if (!encData) return res.redirect("/payment-failed");

//     const decrypted = decryptWorldlineResponse(encData);

//     const response = Object.fromEntries(
//       decrypted.split("&").map(kv => kv.split("="))
//     );

//     const { cartId } = response;

//     if (cartId) {
//       const orderId = cartId.replace("ORDER_", "");
//       const order = await Order.findById(orderId);

//       if (order && order.status !== "PAID") {
//         order.status = "FAILED";
//         await order.save();
//       }
//     }

//     res.redirect("/payment-failed");

//   } catch (err) {
//     console.error(err);
//     res.redirect("/payment-failed");
//   }
// };
// const Order = require("../models/Order");
// const Payment = require("../models/Payment");
// const generateInvoiceNumber = require("../utils/invoiceGenerator");

// exports.worldlineResponse = async (req, res) => {
//   try {
//     const msg = req.body.msg;
//     if (!msg) return res.redirect("/payment-failed");

//     const [
//       txn_status,
//       txn_msg,
//       txn_err_msg,
//       clnt_txn_ref,
//       tpsl_bank_cd,
//       tpsl_txn_id,
//       txn_amt,
//     ] = msg.split("|");

//     const order = await Order.findById(clnt_txn_ref);
//     if (!order) return res.redirect("/payment-failed");

//     if (txn_status === "0300") {
//       if (order.status !== "PAID") {
//         const invoiceNumber = await generateInvoiceNumber();

//         order.status = "PAID";
//         order.invoiceNumber = invoiceNumber;
//         await order.save();

//         await Payment.create({
//           orderId: order._id,
//           userSid: order.userSid,
//           gateway: "Worldline",
//           transactionId: tpsl_txn_id,
//           status: "SUCCESS",
//           paidAmount: Number(txn_amt),
//           currency: order.currency,
//           paidAt: new Date(),
//           rawResponse: msg,
//         });
//       }

//       return res.redirect(`/payment-success?invoice=${order.invoiceNumber}`);
//     }

//     // Failure cases
//     order.status = "FAILED";
//     await order.save();
//     return res.redirect("/payment-failed");

//   } catch (err) {
//     console.error("Worldline response error:", err);
//     res.redirect("/payment-failed");
//   }
// };

// exports.worldlineResponse = async (req, res) => {
//   try {
//     const response = req.body;

//     console.log("Worldline Final Response:", response);

//     const txn =
//       response?.paymentMethod?.paymentTransaction;

//     if (!txn) {
//       return res.status(400).json({ message: "Invalid response" });
//     }

//     const {
//       statusCode,
//       clntTxnRef,
//       txnId,
//       amount,
//       paymentMode
//     } = txn;

//     const order = await Order.findById(clntTxnRef);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Idempotency
//     if (order.status === "PAID") {
//       return res.json({
//         invoiceNumber: order.invoiceNumber
//       });
//     }

//     if (statusCode === "0300") {
//       const invoiceNumber = await generateInvoiceNumber();

//       order.status = "PAID";
//       order.invoiceNumber = invoiceNumber;
//       await order.save();

//       await Payment.create({
//         orderId: order._id,
//         userSid: order.userSid,
//         gateway: "Worldline",
//         paymentMethod: paymentMode,
//         transactionId: txnId,
//         status: "SUCCESS",
//         paidAmount: Number(amount),
//         currency: order.currency,
//         paidAt: new Date(),
//         rawResponse: response
//       });

//       return res.json({ invoiceNumber });
//     }

//     // Failure cases
//     order.status = "FAILED";
//     await order.save();

//     return res.status(400).json({ message: "Payment failed" });

//   } catch (err) {
//     console.error("Worldline verify error:", err);
//     res.status(500).json({ message: "Verification error" });
//   }
// };

// exports.worldlineResponse = async (req, res) => {
//   try {
//     const encData = req.body.encData || req.query.encData;
//     if (!encData) return res.redirect("http://localhost:5173/payment-failed");

//     const decrypted = decryptWorldlineResponse(encData);
//     console.log("Worldline decrypted:", decrypted);

//     const fields = decrypted.split("|");

//     const txnStatus = fields[0];       // 0300 / 0399
//     const cartId = fields[3];          // ORDER_<mongoId>
//     const txnAmount = fields[6];
//     const txnId = fields[5];

//     if (!cartId || !cartId.startsWith("ORDER_")) {
//       console.error("Invalid cartId:", cartId);
//       return res.redirect("http://localhost:5173/payment-failed");
//     }

//     const orderId = cartId.replace("ORDER_", "");
//     const order = await Order.findById(orderId);

//     if (!order) {
//       console.error("Order not found:", orderId);
//       return res.redirect("http://localhost:5173/payment-failed");
//     }

//     if (txnStatus === "0300") {
//       order.status = "PAID";
//       order.invoiceNumber = await generateInvoiceNumber();
//       await order.save();

//       await Payment.create({
//         orderId: order._id,
//         userSid: order.userSid,
//         gateway: "Worldline",
//         transactionId: txnId,
//         status: "SUCCESS",
//         paidAmount: Number(txnAmount),
//         currency: order.currency,
//         rawResponse: decrypted
//       });

//       return res.redirect(
//         `http://localhost:5173/payment-success?invoice=${order.invoiceNumber}`
//       );
//     }

//     // ❌ FAILURE CASE
//     order.status = "FAILED";
//     await order.save();

//     return res.redirect("http://localhost:5173/payment-failed");

//   } catch (err) {
//     console.error("Worldline response error:", err);
//     return res.redirect("http://localhost:5173/payment-failed");
//   }
// };

// exports.worldlineResponse = async (req, res) => {
//   try {
//     const msg = req.body.msg;
//     if (!msg) {
//       console.error("No msg received from Worldline");
//       return res.redirect("http://localhost:5173/payment-failed");
//     }

//     console.log("Worldline Final Response:", msg);

//     const fields = msg.split("|");

//     const txnStatus = fields[0];          // 0300 / 0399
//     const clientTxnRef = fields[3];       // ORDER_<mongoId>
//     const txnAmount = fields[6];
//     const txnId = fields[5];

//     if (!clientTxnRef || !clientTxnRef.startsWith("ORDER_")) {
//       console.error("Invalid clnt_txn_ref:", clientTxnRef);
//       return res.redirect("http://localhost:5173/payment-failed");
//     }

//     const orderId = clientTxnRef.replace("ORDER_", "");

//     // ✅ SAFETY CHECK
//     if (!orderId.match(/^[0-9a-fA-F]{24}$/)) {
//       console.error("Invalid Mongo ObjectId:", orderId);
//       return res.redirect("http://localhost:5173/payment-failed");
//     }

//     const order = await Order.findById(orderId);
//     if (!order) {
//       console.error("Order not found:", orderId);
//       return res.redirect("http://localhost:5173/payment-failed");
//     }

//     // ✅ SUCCESS
//     if (txnStatus === "0300") {
//       if (order.status !== "PAID") {
//         order.status = "PAID";
//         order.invoiceNumber = await generateInvoiceNumber();
//         await order.save();

//         await Payment.create({
//           orderId: order._id,
//           userSid: order.userSid,
//           gateway: "Worldline",
//           transactionId: txnId,
//           status: "SUCCESS",
//           paidAmount: Number(txnAmount),
//           currency: order.currency,
//           rawResponse: msg,
//         });
//       }

//       return res.redirect(
//         `http://localhost:5173/payment-success?invoice=${order.invoiceNumber}`
//       );
//     }

//     // ❌ FAILURE
//     order.status = "FAILED";
//     await order.save();
//     return res.redirect("http://localhost:5173/payment-failed");

//   } catch (err) {
//     console.error("Worldline response error:", err);
//     return res.redirect("http://localhost:5173/payment-failed");
//   }
// };

// exports.worldlineResponse = async (req, res) => {
//   try {
//     const msg = req.body.msg;
//     if (!msg) return res.redirect("/payment-failed");

//     const parts = msg.split("|");

//     const txnStatus = parts[0];          // 0300 / 0399
//     const clntTxnRef = parts[3];         // orderId
//     const txnId = parts[5];
//     const amount = parts[6];
//     const receivedHash = parts[15];

//     if (!clntTxnRef || clntTxnRef.length !== 24) {
//       return res.redirect("http://localhost:5173/payment-failed");
//     }

//     const order = await Order.findById(clntTxnRef);
//     if (!order) return res.redirect("http://localhost:5173/payment-failed");


//     // 🔐 HASH VERIFICATION
//     const raw = parts.slice(0, 15).join("|") + "|" + process.env.WORLDLINE_SALT;
//     const calculatedHash = crypto.createHash("sha512").update(raw).digest("hex");

//     if (calculatedHash !== receivedHash) {
//       return res.redirect("http://localhost:5173/payment-failed");
//     }

//     if (txnStatus === "0300") {
//       order.status = "PAID";
//       await order.save();

//       await Payment.create({
//         orderId: order._id,
//         userSid: order.userSid,
//         gateway: "Worldline",
//         transactionId: txnId,
//         status: "SUCCESS",
//         paidAmount: Number(amount),
//         currency: "INR",
//         rawResponse: msg,
//       });

//       return res.redirect(`http://localhost:5173/payment-success?invoice=${order.invoiceNumber}`);
// ;
//     }

//     order.status = "FAILED";
//     await order.save();
//     return res.redirect("http://localhost:5173/payment-failed");

//   } catch (err) {
//     console.error("Worldline verify error:", err);
//     return res.redirect("http://localhost:5173/payment-failed");
//   }
// };

const crypto = require("crypto");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const generateInvoiceNumber = require("../utils/invoiceGenerator");
const { sendEmail } = require("../services/email.service");
const customerOrderConfirmation = require('../templates/emails/customerOrderConfirmation');
const ownerOrderNotification = require('../templates/emails/ownerOrderNotification');
const Customization = require("../models/Customization");

exports.worldlineResponse = async (req, res) => {
  try {
    console.log("========== WORLDLINE CALLBACK ==========");
    console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);

    const msg = req.body.msg;
    if (!msg) {
      console.error("❌ msg missing");
      return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
    }

    console.log("RAW MSG:", msg);

    const fields = msg.split("|");

    // 🧠 MUST KEEP ALL POSITIONS (even empty)
    const [
      txn_status,
      txn_msg,
      txn_err_msg,
      clnt_txn_ref,
      tpsl_bank_cd,
      tpsl_txn_id,
      txn_amt,
      clnt_rqst_meta,
      tpsl_txn_time,
      bal_amt,
      card_id,
      alias_name,
      bank_txn_id,
      mandate_reg_no,
      token,
      response_hash
    ] = fields;

    // 🔐 Recreate hash EXACTLY
    const rawHashString = [
      txn_status,
      txn_msg,
      txn_err_msg,
      clnt_txn_ref,
      tpsl_bank_cd,
      tpsl_txn_id,
      txn_amt,
      clnt_rqst_meta,
      tpsl_txn_time,
      bal_amt,
      card_id,
      alias_name,
      bank_txn_id,
      mandate_reg_no,
      token,
      process.env.WORLDLINE_SALT
    ].join("|");

    const calculatedHash = crypto
      .createHash("sha512")
      .update(rawHashString)
      .digest("hex");

    console.log("CALCULATED HASH:", calculatedHash);
    console.log("RESPONSE HASH  :", response_hash);

    if (calculatedHash !== response_hash) {
      console.error("❌ HASH MISMATCH");
      return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
    }

    console.log("✅ HASH VERIFIED");

    // 🧾 Order reference
    const order = await Order.findById(clnt_txn_ref).populate({
      path: 'customizationId',
      populate: {
        path: 'userId',
        model: 'User'
      }
    })
    .exec();

    if (!order) {
      console.error("❌ Order not found");
      return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
    }

    if (txn_status === "0300") {
      order.status = "PAID";
      await order.save();
      await Payment.create({
        orderId: order._id,
        userSid:order.userSid,
        invoiceNumber:order.invoiceNumber,
        gateway: "Worldline",
        transactionId: tpsl_txn_id,
        status: "SUCCESS",
        paidAmount: txn_amt,
        rawResponse: msg
      });
      const customization = order.customizationId;
      const userDetails = customization.userId;
      await Customization.findByIdAndUpdate(
        customization._id,
        { 
          order_status: 'PLACED',
          isPlaced:true
        }
      );
      // Generate email templates
      const customerEmailHtml = customerOrderConfirmation(order, customization, userDetails);
      const ownerEmailHtml = ownerOrderNotification(order, customization, userDetails);

      await sendEmail({
        to: 'harunhameem@gmail.com',
        subject: 'Order Confirmation - Custom Cycle Order',
        html: customerEmailHtml
      });

      await sendEmail({
        to: 'harunhameem@gmail.com',
        subject: `New Order Received - #${order.invoiceNumber || order._id}`,
        html: ownerEmailHtml
      });

      return res.redirect(
        `${process.env.FRONTEND_URL}/payment-success?order=${order._id}`
      );
    }

    // ❌ FAILURE / ABORTED / INITIATED
    order.status = "FAILED";
    await order.save();

    return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);

  } catch (err) {
    console.error("Worldline callback error:", err);
    return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
  }
};
