const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (amount, currency, eventId) => {
    try {
      const order = await razorpay.orders.create({
        amount,
        currency,
        receipt: `event_${eventId}`,
      });
  
      return order;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw new Error('Error creating Razorpay order');
    }
  };
  

const verifyPayment = async (order_id, razorpay_payment_id, razorpay_signature) => {
  try {
    const isValidSignature = razorpay.webhooks.verifyPaymentSignature({
      order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    return isValidSignature;
  } catch (error) {
    console.error('Error verifying payment signature:', error);
    throw new Error('Error verifying payment signature');
  }
};

module.exports = { createOrder, verifyPayment };