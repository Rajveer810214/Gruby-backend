const generateToken = require('../utils/generateToken/index'); // Adjust the path if needed
const { submitContact, getAllContacts } = require('../routes/index'); // Adjust the path if needed

describe('POST /submit_contact', () => {
  test('should submit a new contact message', async () => {
    const token = await generateToken(); // Generate the token
    const contactData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'Test message',
      contactId: 'contact1',
    };

    const response = await submitContact(token, contactData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Message submitted successfully');
  });
});

describe('GET /get_all_contacts', () => {
  test('should fetch all contact messages', async () => {
    const token = await generateToken(); // Generate the token
    const response = await getAllContacts(token);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
