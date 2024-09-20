// feedbackRouter.js (Route File)
const express = require('express');
const router = express.Router();
const Feedback = require('../../models/user_feedback/index'); // Assuming your model file is in the correct path
const db = require('../../config/firebase/firebase-config');
const appCheckVerification = require('../../middleware/appCheckVerification');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to submit feedback
router.post('/submit_feedback', appCheckVerification, async (req, res) => {
  try {
    const { feedbackId, feedback, rating, userId } = req.body;

    // Create a new Feedback object
    const newFeedback = new Feedback(feedbackId, feedback, rating, userId, new Date().toISOString());

    // Save the feedback to Firestore with a generated ID
    // Assuming db is properly initialized
    const feedbackRef = db.collection('user_feedback').doc();
    await feedbackRef.set({
      feedback: newFeedback.feedback,
      rating: newFeedback.rating,
      userId: newFeedback.userId,
      createdAt: newFeedback.createdAt,
    });

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// Route to fetch all feedback entries by rating
router.post('/get_all_feedback', appCheckVerification, async (req, res) => {
  try {
    const { rating } = req.body;
    const feedbackSnapshot = await db.collection('user_feedback').where('rating', '==', rating).get();
    const feedbackList = feedbackSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(feedbackList);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

module.exports = router;
