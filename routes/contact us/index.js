// contactRouter.js (Route File)
const express = require('express');
const router = express.Router();
const ContactMessage = require('../../models/contact us/index'); // Assuming your model file is in the correct path
const db = require('../../config/firebase/firebase-config');
const appCheckVerification = require('../../middleware/appCheckVerification')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to submit a contact message
router.post('/submit_contact', appCheckVerification, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const createdAt = new Date().toISOString();  // Use ISO string format for createdAt

    // Create a new ContactMessage object with the received data
    const newContactMessage = new ContactMessage(name, email, message, createdAt);

    // Save the message to Firestore using auto-generated document ID
    await db.collection('contact_messages').add({
      name: newContactMessage.name,
      email: newContactMessage.email,
      message: newContactMessage.message,
      createdAt: newContactMessage.createdAt,
    });

    res.status(201).json({ message: 'Message submitted successfully' });
  } catch (error) {
    console.error('Error submitting message:', error);
    res.status(500).json({ error: 'Failed to submit message' });
  }
});

// Route to fetch all contact messages
router.get('/get_all_contacts', appCheckVerification, async (req, res) => {
  try {
    const contactsSnapshot = await db.collection('contact_messages').get();
    const contactList = [];

    contactsSnapshot.forEach((doc) => {
      contactList.push(doc.data());
    });

    res.status(200).json(contactList);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
