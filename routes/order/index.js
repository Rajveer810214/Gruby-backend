const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = require('../../config/firebase/firebase-config');
const Order = require('../../models/order/index'); // Assuming your model file is in the correct path
const appCheckVerification = require('../../middleware/appCheckVerification');
const client = require('../../config/redisClient/client');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to create a new order
router.post('/orders', appCheckVerification, async (req, res) => {
  try {
    const {
      userId,
      discountAmount,
      easebuzzTxnId,
      items,
      isVeg,
      orderStatus,
      paymentStatus,
      preOrder,
      restaurantImageUrl,
      restaurantLocation,
      restaurantName,
      totalPrice,
      userFcmToken,
      userName,
      vendorFcmToken,
      vendorId,
      orderId
    } = req.body;

    // Convert createdAt to actual date format
    const createdAt = new Date();

    // Create a new Order object using the model
    const newOrderData = new Order(
      userId,
      discountAmount,
      easebuzzTxnId,
      items,
      isVeg,
      orderStatus,
      paymentStatus,
      preOrder,
      restaurantImageUrl,
      restaurantLocation,
      restaurantName,
      totalPrice,
      userFcmToken,
      userName,
      vendorFcmToken,
      vendorId,
      createdAt,
      orderId
    );

    // Reference to the user's orders document
    const userOrdersDocRef = db.collection('orders').doc(userId);

    // Create or update the document by adding the new order to the orders array
    await userOrdersDocRef.set(
      {
        orders: admin.firestore.FieldValue.arrayUnion(newOrderData.toObject()), // Convert to plain object
      },
      { merge: true }
    );

    // await client.del('orders');

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Route to fetch all orders with specific orderStatus and paymentStatus
router.post('/fetchAllOrders', appCheckVerification, async (req, res) => {
  try {
    // Check if orders are cached
    const cacheAllOrders = await client.get('orders');
    if (cacheAllOrders) {
      // Parse cached orders from JSON string
      const cachedOrders = JSON.parse(cacheAllOrders);
      return res.status(200).json(cachedOrders);
    }

    const { orderStatus, paymentStatus } = req.body;
    const ordersSnapshot = await db.collection('orders')
      .where('orderStatus', '==', orderStatus)
      .where('paymentStatus', '==', paymentStatus)
      .get();
    
    const ordersList = [];
    ordersSnapshot.forEach((doc) => {
      ordersList.push(doc.data());
    });

    // Serialize orders list to JSON string and store in Redis
    await client.set('orders', JSON.stringify(ordersList));
    await client.expire('orders', 30);

    res.status(200).json(ordersList);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Route to get all orders for a specific user by userId
router.get('/orders/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userOrdersQuery = db.collection('orders').where('userId', '==', userId);
    const userOrdersSnapshot = await userOrdersQuery.get();

    if (userOrdersSnapshot.empty) {
      return res.status(404).json({ message: 'User not found or no orders found for the user' });
    }

    const ordersList = [];
    userOrdersSnapshot.forEach(doc => {
      ordersList.push(doc.data());
    });

    res.status(200).json(ordersList);
  } catch (error) {
    console.error('Error fetching orders by userId:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


module.exports = router;
