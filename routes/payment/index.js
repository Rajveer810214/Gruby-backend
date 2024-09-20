// orderRouter.js (Route File)
const express = require('express');
const router = express.Router();
const Order = require('../../models/payment/index'); // Assuming your model file is in the correct path
const db = require('../../config/firebase/firebase-config');
const appCheckVerification = require('../../middleware/appCheckVerification');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to update the paymentStatus of an order
router.post('/update_payment_status', appCheckVerification, async (req, res) => {
  try {
    const { orderId, userId, paymentStatus } = req.body;

    // Create a new Order object with the received data
    const updatedOrder = new Order(orderId, userId, paymentStatus);

    // Find the document in the 'orders' collection using orderId and userId
    const orderQuerySnapshot = await db.collection('orders')
      .where('orderId', '==', updatedOrder.orderId)
      .where('userId', '==', updatedOrder.userId)
      .get();

    if (orderQuerySnapshot.empty) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the paymentStatus attribute for the found document
    const orderDoc = orderQuerySnapshot.docs[0];
    await orderDoc.ref.update({ paymentStatus: updatedOrder.paymentStatus });

    res.status(200).json({ message: 'Payment status updated successfully' });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

module.exports = router;
