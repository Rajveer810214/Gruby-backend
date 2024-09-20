const generateToken = require('../utils/generateToken/index'); // Adjust the path if needed
const { applyCoupon} = require('../routes/index'); // Adjust the path if needed

describe('POST /apply-coupon', () => {
  test('should apply a coupon code successfully', async () => {
    const token = await generateToken(); // Generate the token
    const requestData = {
      userId: 'user123', // Replace with an actual user ID
      offerCode: 'GRUBY20', // Replace with an actual offer code
      orderId: 'afkjsdalf' // Replace with an actual order ID
    };

    const response = await applyCoupon(token, requestData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Offer applied successfully');
  });

  test('should return error for invalid offer code', async () => {
    const token = await generateToken(); // Generate the token
    const requestData = {
      userId: 'user123', // Replace with an actual user ID
      offerCode: 'INVALID', // Replace with an invalid offer code
      orderId: 'afkjsdalf' // Replace with an actual order ID
    };

    const response = await applyCoupon(token, requestData);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Invalid offer code');
  });

  test('should return error for expired offer', async () => {
    const token = await generateToken(); // Generate the token
    const requestData = {
      userId: 'user123', // Replace with an actual user ID
      offerCode: 'GRUBY20', // Replace with an expired offer code
      orderId: 'afkjsdalf' // Replace with an actual order ID
    };

    const response = await applyCoupon(token, requestData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'Offer has expired');
  });

  // Add more test cases as needed to cover other scenarios
});
