const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../Routes/razorPay");

router.post("/create-order", async (req, res) => {
  const { amount, currency, eventId } = req.body;

  try {
    const order = await createOrder(amount, currency, eventId);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

router.post("/payment-success", async (req, res) => {
  const { order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const isValidSignature = await verifyPayment(
      order_id,
      razorpay_payment_id,
      razorpay_signature
    );
    if (isValidSignature) {
      res.json({ success: true });
    } else {
      res.status(400).json({ error: "Invalid payment signature" });
    }
  } catch (error) {
    console.error("Error verifying payment signature:", error);
    res.status(500).json({ error: "Failed to verify payment signature" });
  }
});

module.exports = router;
