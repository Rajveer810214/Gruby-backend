// couponRouter.js (Route File)
const express = require('express');
const router = express.Router();
const CouponApplication = require('../../models/coupon/index'); // Assuming your model file is in the correct path
const db = require('../../config/firebase/firebase-config');
const admin = require('firebase-admin');
const appCheckVerification = require('../../middleware/appCheckVerification')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to apply for a coupon code
router.post('/apply-coupon', appCheckVerification, async (req, res) => {
  try {
    const { userId, offerCode, orderId } = req.body;

    // Create a new CouponApplication object
    const couponApplication = new CouponApplication(userId, offerCode, orderId);

    // Reference to the offers collection
    const offerQuery = await db.collection('offers').where('offerCode', '==', couponApplication.offerCode).get();
    const offerDoc = offerQuery.docs[0]; // Assuming there is only one document with the offerCode
    if (!offerDoc) {
      return res.status(404).json({ error: 'Invalid offer code' });
    }
    const offerData = offerDoc.data();
    // Check if the offer is expired or already used by the user
    if (offerData.removedAt) {
      return res.status(400).json({ error: 'Offer has been removed' });
    }
    if (!offerData.isProvidedByVendor) {
      return res.status(400).json({ error: 'Offer has expired' });
    }
    if (offerData.usersRedeemed && offerData.usersRedeemed.includes(userId)) {
      return res.status(400).json({ error: 'Offer has expired' });
    }
    // Reference to the user's orders collection
    const userOrders = await db.collection('orders').where('userId', '==', couponApplication.userId).where('orderId', '==', couponApplication.orderId).get();
    const userOrderDocs = userOrders.docs;
    if (userOrderDocs.length === 0) {
      return res.status(404).json({ error: 'User orders not found' });
    }
    const userOrder = userOrderDocs[0]; // Assuming there is only one order for the user
    const userOrderData = userOrder.data();
    // Check if the user's cart value meets the minimum required for the offer
    const cartValue = userOrderData.totalPrice;
    if (cartValue < offerData.minValueOfCart) {
      return res.status(400).json({ error: 'Your cart value does not meet the minimum required for this offer' });
    }
    // Apply the offer to the user's document
    await userOrder.ref.update({
      appliedOffers: admin.firestore.FieldValue.arrayUnion(couponApplication.offerCode),
      cartValue: cartValue - offerData.maxDiscount, // Adjust the cart value after discount
    });
    // Mark the offer as redeemed by the user
    await offerDoc.ref.update({
      usersRedeemed: admin.firestore.FieldValue.arrayUnion(couponApplication.userId),
    });

    res.status(200).json({ message: 'Offer applied successfully' });
  } catch (error) {
    console.error('Error applying offer:', error);
    res.status(500).json({ error: 'Failed to apply offer' });
  }
});

module.exports = router;
