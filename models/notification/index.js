// notification.js (Model File)
const admin = require('firebase-admin');

function createNotification(message, createdAt = admin.firestore.Timestamp.now(), status = 'unread', recipientId) {
    return {
        message,
        createdAt,
        status,
        recipientId
    };
}

module.exports = createNotification;
