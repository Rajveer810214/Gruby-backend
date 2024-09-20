const generateToken = require('../utils/generateToken/index'); // Adjust the path if needed
const { updatePaymentStatus } = require('../routes/index'); // Adjust the path if needed

describe('POST /update_payment_status', () => {
  test('should update payment status for a valid order', async () => {
    const token = await generateToken(); // Generate the token

    const payment = {
      orderId: "afkjsdalf",
      userId: "user123",
      paymentStatus: "paid"
    };
    const response = await updatePaymentStatus(token, payment);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Payment status updated successfully');
  });

  test('should return 404 for an invalid order', async () => {
    const payment = {
      orderId: "afkjsdfasfalf",
      userId: "user123",
      paymentStatus: "paid"
    };
    const token = await generateToken(); // Generate the token

    const response = await updatePaymentStatus(token, payment);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Order not found');
  });

  // Add more test cases as needed
});
