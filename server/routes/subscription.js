const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authenticateToken = require('../middleware/authenticateToken'); // Import the middleware

router.post('/add-subscription', authenticateToken, subscriptionController.addSubscription);

module.exports = router;