const generateToken = require('../utils/generateToken'); // Adjust the path if needed
const {
  createOrder,
  fetchOrders,
  fetchUserOrders,
} = require('../routes/index'); // Adjust the path if needed

describe('POST /orders', () => {
  test('should create a new order', async () => {
    const token = await generateToken(); // Generate the token

    const newOrderData = {
      discountAmount: 15,
      easebuzzTxnId: 'txnId1',
      items: ['Sandwich', 'Fries'],
      isVeg: false,
      orderStatus: 'Delivered',
      paymentStatus: 'Pending',
      preOrder: true,
      restaurantImageUrl: 'https://example.com/restaurant.jpg',
      restaurantLocation: 'Los Angeles',
      restaurantName: 'Tasty Bites',
      totalPrice: 30,
      userFcmToken: 'userToken1',
      userId: 'user1',
      userName: 'Jane Smith 1',
      vendorFcmToken: 'vendorToken1',
      vendorId: 'vendor1',
      orderId: 'order1',
    };
    const response = await createOrder(token, newOrderData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Order created successfully');
  });
});

describe('POST /fetchAllOrders', () => {
  test('should fetch orders with specific status and payment status', async () => {
    const token = await generateToken(); // Generate the token

    const filterData = {
      orderStatus: 'Delivered',
      paymentStatus: 'Pending',
    };
    const response = await fetchOrders(token, filterData);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /orders/:userId', () => {
  test('should fetch orders for a specific user', async () => {
    const token = await generateToken(); // Generate the token

    const userId = "MbRSLL0F1ROrd4r0skmahXjk1s83"; // Replace 'user1' with an actual user ID
    const response = await fetchUserOrders(token, userId);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

});
