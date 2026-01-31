// const Customization = require("../models/Customization");
// const ThemeConfig = require("../models/ThemeConfig");
// const Order = require("../models/Order");
// const generateToken = require("../utils/generateToken");

// exports.createPayment = async (req, res) => {
//   try {
//     const { customizationId, userSid } = req.body;

//     if (!customizationId || !userSid) {
//       return res.status(400).json({ message: "Missing data" });
//     }

//     const customization = await Customization.findById(customizationId);
//     if (!customization) {
//       return res.status(404).json({ message: "Customization not found" });
//     }

//     const theme = await ThemeConfig.findOne({ themeId: customization.themeId });
//     if (!theme || !theme.price) {
//       return res.status(400).json({ message: "Price not configured" });
//     }

//     const order = await Order.create({
//       userSid,
//       customizationId,
//       customization_number: customization.customization_number,
//       amount: theme.price,
//       currency: "INR",
//       status: "PENDING",
//     });

//     const token = generateToken({
//       merchantId: process.env.WORLDLINE_MERCHANT_ID,
//       txnId: order._id.toString(),
//       amount: theme.price,
//       salt: process.env.WORLDLINE_SALT,
//     });

//     return res.json({
//       checkoutPayload: {
//         features: {
//           enableAbortResponse: true,
//           showPGResponseMsg: true,
//         },
//         consumerData: {
//           deviceId: "WEBSH2",
//           token,
//           returnUrl: `${process.env.APP_BASE_URL}/api/payment/response`,
//           responseHandler: "handleWorldlineResponse",
//           paymentMode: "all",
//           merchantId: process.env.WORLDLINE_MERCHANT_ID,
//           currency: "INR",
//           txnId: order._id.toString(),
//           items: [
//             {
//               itemId: customization.customization_number,
//               amount: theme.price.toFixed(2),
//               comAmt: "0",
//             },
//           ],
//         },
//       },
//     });
//   } catch (err) {
//     console.error("Create payment error:", err);
//     return res.status(500).json({ message: "Payment initiation failed" });
//   }
// };

const Customization = require("../models/Customization");
const ThemeConfig = require("../models/ThemeConfig");
const Order = require("../models/Order");
const generateToken = require("../utils/generateToken");
const generateInvoiceNumber = require("../utils/invoiceGenerator");

// exports.createPayment = async (req, res) => {
//   try {
//     const { customizationId, userSid } = req.body;

//     const customization = await Customization.findById(customizationId);
//     const theme = await ThemeConfig.findOne({ themeId: customization.themeId });

//     const order = await Order.create({
//       userSid,
//       customizationId,
//       customization_number: customization.customization_number,
//       amount: theme.price,
//       currency: "INR",
//       status: "PENDING"
//     });

//     // const token = generateToken({
//     //   merchantId: process.env.WORLDLINE_MERCHANT_ID,
//     //   txnId: order._id.toString(), // IMPORTANT
//     //   amount: theme.price,
//     //   salt: process.env.WORLDLINE_SALT
//     // });
//     const token = generateToken({
//       merchantId: process.env.WORLDLINE_MERCHANT_ID,
//       txnId: order._id.toString(),
//       amount: theme.price,
//       consumerId: userSid,
//       email: "",
//       mobile: "",
//       salt: process.env.WORLDLINE_SALT,
//     });

  
//     res.json({
//       checkoutPayload: {
//         features: { enableAbortResponse: true },
//         consumerData: {
//           deviceId: "WEBSH2",
//           token,
//           returnUrl: `${process.env.APP_BASE_URL}/api/payment/response`,
//           responseHandler: "handleResponse",
//           paymentMode: "all",
//           merchantId: process.env.WORLDLINE_MERCHANT_ID,
//           currency: "INR",
//           consumerId: userSid,
//           txnId: order._id.toString(),
//           items: [{
//             itemId: customization.customization_number,
//             // amount: theme.price.toFixed(2),
//             amount: Number(theme.price).toFixed(2),
//             comAmt: "0"
//           }]
//         }
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Payment init failed" });
//   }
// };

exports.createPayment = async (req, res) => {
  try {
    const { customizationId, userSid } = req.body;

    if (!customizationId || !userSid) {
      return res.status(400).json({ message: "Missing data" });
    }

    const customization = await Customization.findById(customizationId);
    if (!customization) {
      return res.status(404).json({ message: "Customization not found" });
    }

    const theme = await ThemeConfig.findOne({ themeId: customization.themeId });
    if (!theme || !theme.price) {
      return res.status(400).json({ message: "Price not configured" });
    }

    const amount = Number(theme.price).toFixed(2); // 🔥 FIXED
    const invoiceNumber = await generateInvoiceNumber();
    const order = await Order.create({
      userSid,
      customizationId,
      amount,
      currency: "INR",
      status: "PENDING",
      invoiceNumber:invoiceNumber
    });

    const token = generateToken({
      merchantId: process.env.WORLDLINE_MERCHANT_ID,
      txnId: order._id.toString(),
      amount,
      consumerId: userSid,   // 🔥 MUST MATCH
      email: "",
      mobile: "",
      salt: process.env.WORLDLINE_SALT,
    });

    res.json({
      checkoutPayload: {
        features: {
          enableAbortResponse: true,
          showPGResponseMsg: true,
        },
        consumerData: {
          deviceId: "WEBSH2",
          token,
          returnUrl: `${process.env.APP_BASE_URL}/api/payment/response`,
          responseHandler: "handleWorldlineResponse",
          paymentMode: "all",
          merchantId: process.env.WORLDLINE_MERCHANT_ID,
          currency: "INR",
          consumerId: userSid,        // 🔥 SAME
          txnId: order._id.toString(),
          items: [
            {
              itemId: "First",
              amount,                // 🔥 SAME FORMAT
              comAmt: "0",
            },
          ],
        },
      },
    });
  } catch (err) {
    console.error("Create payment error:", err);
    res.status(500).json({ message: "Payment initiation failed" });
  }
};
