const generateToken = require('../utils/generateToken/index'); // Adjust the path if needed
const {getAllVendors} = require('../routes/index'); // Adjust the path if needed

describe('GET /get_all_vendors', () => {
  test('should fetch all vendors', async () => {
    const token = await generateToken();
    console.log('Generated Token:', token); // Log the generated token

    const response = await getAllVendors(token); // Use the utility function for the request

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
