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
    merchantId,
    txnId,
    Number(amount).toFixed(2), // IMPORTANT
    consumerId,
    email,
    mobile,
    "", "", "", "", "", "", "", "", "",
    salt,
  ].join("|");

  return crypto
    .createHash("sha512")
    .update(raw)
    .digest("hex")
    .toUpperCase();
};


