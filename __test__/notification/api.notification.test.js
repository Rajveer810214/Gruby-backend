const generateToken = require('../utils/generateToken'); // Adjust the path if needed
const {
  createOrUpdateNotification,
  getNotifications,
} = require('../routes/index'); // Adjust the path if needed

describe('POST /notification', () => {
  test('should create or update a notification', async () => {
    const notificationData = {
      recipientId: 'user1', // Replace with an actual user ID
      message: 'Test notification message',
    };
    const token = await generateToken(); // Generate the token

    const response = await createOrUpdateNotification(token, notificationData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Notification sent successfully');
  });
});

describe('GET /notification/:userId', () => {
  test('should fetch all notifications for a specific user', async () => {
    const userId = 'user1'; // Replace with an actual user ID
    const token = await generateToken(); // Generate the token

    const response = await getNotifications(token, userId);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should return an empty array if user has no notifications', async () => {
    const userId = 'nonExistentUser'; // Replace with a non-existent user ID
    const token = await generateToken(); // Generate the token

    const response = await getNotifications(token, userId);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });
});
