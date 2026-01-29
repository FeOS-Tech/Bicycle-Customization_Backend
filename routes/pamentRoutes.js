// const router = require("express").Router();
// const payment = require("../controllers/paymentController");
// const wp = require("../controllers/worldpayController");

// router.post("/create", payment.createPayment);
// router.post("/success", wp.worldpaySuccess);
// router.post("/failure", wp.worldpayFailure);

// module.exports = router;
const router = require("express").Router();
const payment = require("../controllers/paymentController");
const worldline = require("../controllers/worldpayController");

router.post("/create", payment.createPayment);
router.post("/response", worldline.worldlineResponse);

module.exports = router;
