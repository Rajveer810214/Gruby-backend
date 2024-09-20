const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const createNotification = require('../../models/notification/index');
const db = admin.firestore();
const appCheckVerification = require('../../middleware/appCheckVerification')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to create or update a notification
router.post('/notification',appCheckVerification, async (req, res) => {
    try {
        const { recipientId, message } = req.body;

        const newNotification = createNotification(message, undefined, undefined, recipientId);

        const userNotificationsRef = db.collection('userNotifications').doc();

        await userNotificationsRef.set({
            notifications: admin.firestore.FieldValue.arrayUnion(newNotification)
        }, { merge: true });

        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Failed to send notification' });
    }
});

// Route to get all notifications for a specific user
router.get('/notification/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const userNotificationsRef = db.collection('userNotifications').doc(userId);
        const doc = await userNotificationsRef.get();

        if (!doc.exists) {
            res.status(200).json([]);
            return;
        }

        const userNotifications = doc.data().notifications || [];

        // Sort notifications by createdAt in descending order
        userNotifications.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());

        const notifications = userNotifications.map(notification => ({
            notificationId: notification.id,
            message: notification.message,
            timestamp: notification.createdAt.toDate().toISOString(),
            status: notification.status
        }));

        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

module.exports = router;
