const generateToken = require('../utils/generateToken'); // Adjust the path if needed
const { submitFeedback, getAllFeedback } = require('../routes/index'); // Adjust the path if needed

describe('POST /submit_feedback', () => {
  test('should submit feedback successfully', async () => {
    const token = await generateToken(); // Generate the token

    const feedbackData = {
      feedback: 'Great service!',
      rating: 5,
      userId: 'user1', // Replace with an actual user ID
      feedbackId: 'feedback123', // Replace with an actual feedback ID
    };

    const response = await submitFeedback(token, feedbackData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Feedback submitted successfully');
  });
});

describe('POST /get_all_feedback', () => {
  test('should fetch all feedback entries with specific rating', async () => {
    const requestData = {
      rating: 5, // Replace with the desired rating to fetch
    };
    const token = await generateToken(); // Generate the token

    const response = await getAllFeedback(token, requestData);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should return an empty array if no feedback entries found for the rating', async () => {
    const requestData = {
      rating: 1, // Rating for which no feedback entries exist
    };
    const token = await generateToken(); // Generate the token

    const response = await getAllFeedback(token, requestData);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });
});
