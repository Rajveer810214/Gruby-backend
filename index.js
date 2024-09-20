const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const { rateLimit } = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 10, // each IP can make up to 10 requests per `windowsMs` (5 minutes)
    standardHeaders: true, // add the `RateLimit-*` headers to the response
    legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
    });
app.use(cors());
app.use(limiter);
  
// Define a route to fetch data
const order = require('./routes/order/index');
const messages = require('./routes/contact us/index');
const vendors = require('./routes/allVendors/index');
const feedback = require('./routes/user_feedback/index');
const updatePaymentStatus = require('./routes/payment/index');
const notification = require('./routes/notification/index');
const coupon = require('./routes/coupon/index');

app.use('/api', order);
app.use('/api', messages);
app.use('/api', vendors);
app.use('/api', feedback);
app.use('/api', updatePaymentStatus);
app.use('/api', notification);
app.use('/api', coupon);

module.exports = app; // Export the app instance
