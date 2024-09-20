const app = require('./index');

const port = process.env.PORT || 8000; // Use the provided port or default to 8000

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server; // Export the server instance
