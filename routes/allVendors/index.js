const express = require('express');
const router = express.Router();
const db = require('../../config/firebase/firebase-config');
const appCheckVerification = require('../../middleware/appCheckVerification')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to fetch all vendors
router.get('/get_all_vendors', appCheckVerification, async (req, res) => {
  try {
    const vendorsSnapshot = await db.collection('vendors').get();
    const vendorList = []
    vendorsSnapshot.forEach((doc) => {
      vendorList.push(doc.data());
    });

    res.status(200).json(vendorList);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});

module.exports = router;
