// const crypto = require("crypto");

// module.exports = function generateToken({
//   merchantId,
//   txnId,
//   amount,
//   salt,
// }) {
//   const raw = [
//     merchantId,
//     txnId,
//     amount,
//     "", "", "", "", "", "", "", "", "", "", "", "", "",
//     salt,
//   ].join("|");

//   return crypto
//     .createHash("sha512") // WEBSH2
//     .update(raw)
//     .digest("hex");
// };

// const crypto = require("crypto");

// module.exports = function generateToken({
//   merchantId,
//   txnId,
//   amount,
//   salt,
// }) {
//   // 1. Ensure the amount is formatted correctly (usually 2 decimal places or as provided)
//   // 2. Add the specific number of mandatory fields required by your Worldline version
//   const raw = [
//     merchantId,
//     txnId,
//     amount,
//     "", // Field 4 (e.g. Currency)
//     "", // Field 5
//     "", // ... and so on
//     "", "", "", "", "", "", "", "", "", "",
//     salt,
//   ].join("|");

//   return crypto
//     .createHash("sha512")
//     .update(raw)
//     .digest("hex")
//     .toUpperCase(); // Worldline often requires Uppercase
// };
// const crypto = require("crypto");

// module.exports = function generateToken({
//   merchantId,
//   txnId,
//   amount,
//   salt,
// }) {
//   const formattedAmount = Number(amount).toFixed(2);

//   const raw = [
//     merchantId,
//     txnId,
//     formattedAmount,
//     "", "", "", "", "", "", "", "", "", "", "", "", "",
//     salt,
//   ].join("|");

//   return crypto
//     .createHash("sha512")
//     .update(raw)
//     .digest("hex");
// };
// const crypto = require("crypto");

// module.exports = function generateToken({
//   merchantId,
//   txnId,
//   amount,
//   salt,
// }) {
//   // 1. Test accounts MUST have 2 decimal places
//   const formattedAmount = Number(amount).toFixed(2);

//   const raw = [
//     merchantId,
//     txnId,
//     formattedAmount,
//     "INR",             // Field 4: Must match the currency in your form
//     "CUST_123",        // Field 5: Try adding a dummy Consumer ID
//     "", "", "", "", "", "", "", "", "", "", "", // Keep your 13 pipes
//     salt,
//   ].join("|");

//   console.log("TEST HASH STRING:", raw);

//   return crypto
//     .createHash("sha512")
//     .update(raw)
//     .digest("hex")
//     .toUpperCase(); // Test servers almost always expect Uppercase
// };

// const crypto = require("crypto");

// module.exports = function generateToken({
//   merchantId,
//   txnId,
//   amount,
//   consumerId = "",
//   email = "",
//   mobile = "",
//   salt,
// }) {
//   const raw = [
//     merchantId,
//     txnId,
//     Number(amount).toFixed(2), // IMPORTANT
//     consumerId,
//     email,
//     mobile,
//     "", "", "", "", "", "", "", "", "",
//     salt,
//   ].join("|");

//   return crypto
//     .createHash("sha512")
//     .update(raw)
//     .digest("hex");
// };
// const crypto = require("crypto");

// module.exports = function generateToken({
//   merchantId,
//   txnId,
//   amount,
//   salt,
// }) {
//   const formattedAmount = Number(amount).toFixed(2);

//   const raw = [
//     merchantId,
//     txnId,
//     formattedAmount,
//     "", "", "", "", "", "", "", "", "", "", "", "", "",
//     salt,
//   ].join("|");

//   return crypto
//     .createHash("sha512")
//     .update(raw)
//     .digest("hex");
// };
const crypto = require("crypto");

module.exports = function generateToken({
  merchantId,
  txnId,
  amount,
  consumerId = "",
  email = "",
  mobile = "",
  salt,
}) {
  const raw = [
    merchantId,// 1
    txnId,//2 txn
    Number(amount).toFixed(2), // 3 amount
    "",// 4 accNO
    consumerId,// 5 cons id
    mobile,// 6 cons mob
    email,// 7 cons email
    "",// 8 cons card start date
    "",// 9 cons cars end date 
    "",// 10 cons max amo
    "",// 11 amo type
    "",// 12 frequency
    "",// 13 card number 
    "",// 14 exp month 
    "",// 15 exp year 
    "",// 16 card cvv
    salt,
  ].join("|");

  return crypto
    .createHash("sha512")
    .update(raw)
    .digest("hex")
    .toUpperCase();
};


