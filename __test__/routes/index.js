const request = require('supertest');
const app = require('../../index'); // Adjust the path if needed

async function getAllVendors(token) {
  try {
    const response = await request(app)
      .get('/api/get_all_vendors')
      .set('Accept', 'application/json')
      .set('X-Firebase-AppCheck', token);

    return response;
  } catch (error) {
    console.error('Error making request:', error);
    throw error; // Ensure error is thrown for proper handling
  }
}
async function submitContact(token, contactData) {
  try {
    const response = await request(app)
      .post('/api/submit_contact')
      .send(contactData)
      .set('Accept', 'application/json')
      .set('X-Firebase-AppCheck', token);

    return response;
  } catch (error) {
    console.error('Error making request:', error);
    throw error; // Ensure error is thrown for proper handling
  }
}
async function getAllContacts(token) {
  try {
    const response = await request(app)
      .get('/api/get_all_contacts')
      .set('Accept', 'application/json')
      .set('X-Firebase-AppCheck', token);

    return response;
  } catch (error) {
    console.error('Error making request:', error);
    throw error; // Ensure error is thrown for proper handling
  }
}
async function applyCoupon(token, requestData) {
  try {
    const response = await request(app)
      .post('/api/apply-coupon')
      .send(requestData)
      .set('Accept', 'application/json')
      .set('X-Firebase-AppCheck', token);

    return response;
  } catch (error) {
    console.error('Error making request:', error);
    throw error; // Ensure error is thrown for proper handling
  }
}
async function createOrUpdateNotification(token, notificationData) {
  try {
    const response = await request(app)
      .post('/api/notification')
      .send(notificationData)
      .set('Accept', 'application/json')
      .set('X-Firebase-AppCheck', token);

    return response;
  } catch (error) {
    console.error('Error making request:', error);
    throw error; // Ensure error is thrown for proper handling
  }
}
async function getNotifications(token, userId) {
  try {
    const response = await request(app)
      .get(`/api/notification/${userId}`)
      .set('Accept', 'application/json')
      .set('X-Firebase-AppCheck', token);

    return response;
  } catch (error) {
    console.error('Error making request:', error);
    throw error; // Ensure error is thrown for proper handling
  }
}
async function submitFeedback(token, feedbackData) {
  try {
    const response = await request(app)
      .post('/api/submit_feedback')
      .send(feedbackData)
      .set('Accept', 'application/json')
      .set('X-Firebase-AppCheck', token);

    return response;
  } catch (error) {
    console.error('Error making request:', error);
    throw error; // Ensure error is thrown for proper handling
  }
}

async function getAllFeedback(token, requestData) {
  try {
    const response = await request(app)
      .post('/api/get_all_feedback')
      .send(requestData)
      .set('Accept', 'application/json')
      .set('X-Firebase-AppCheck', token);

    return response;
  } catch (error) {
    console.error('Error making request:', error);
    throw error; // Ensure error is thrown for proper handling
  }
}
async function updatePaymentStatus(token, paymentData) {
  try {
    const response = await request(app)
      .post('/api/update_payment_status')
      .send(paymentData)
      .set('Accept', 'application/json')
      .set('X-Firebase-AppCheck', token);

    return response;
  } catch (error) {
    console.error('Error making request:', error);
    throw error; // Ensure error is thrown for proper handling
  }
}
async function createOrder(token, orderData) {
  try {
    const response = await request(app)
      .post('/api/orders')
      .send(orderData)
      .set('Accept', 'application/json')
      .set('X-Firebase-AppCheck', token);

    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error; // Ensure error is thrown for proper handling
  }
}

async function fetchOrders(token, filterData) {
  try {
    const response = await request(app)
      .post('/api/fetchAllOrders')
      .send(filterData)
      .set('Accept', 'application/json')
      .set('X-Firebase-AppCheck', token);

    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Ensure error is thrown for proper handling
  }
}

async function fetchUserOrders(token, userId) {
  try {
    console.log("token, userId")
    const response = await request(app)
      .get(`/api/orders/${userId}`)
      .set('Accept', 'application/json')
      .set('X-Firebase-AppCheck', token);
    return response;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error; // Ensure error is thrown for proper handling
  }
}

async function testSubmitFeedback() {
  const token = await generateToken(); // Generate the token

  const feedbackData = {
    feedback: 'Great service!',
    rating: 5,
    userId: 'user1', // Replace with an actual user ID
    feedbackId: 'feedback123', // Replace with an actual feedback ID
  };

  const response = await submitFeedback(token, feedbackData);

  return response;
}

async function testGetAllFeedback(rating) {
  const requestData = { rating };
  const token = await generateToken(); // Generate the token

  const response = await getAllFeedback(token, requestData);

  return response;
}

module.exports = {
  submitContact,
  getAllContacts,
  getAllVendors,
  applyCoupon,
  createOrUpdateNotification,
  getNotifications,
  submitFeedback,
  getAllFeedback,
  updatePaymentStatus,
  createOrder,
  fetchOrders,
  fetchUserOrders,
  testSubmitFeedback,
  testGetAllFeedback 

};

