const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authenticateToken = require('../middleware/authenticateToken'); // Import the middleware

router.post('/add-subscription', authenticateToken, subscriptionController.addSubscription);
router.get('/display-subscriptions', authenticateToken, subscriptionController.displaySubscriptions);
router.delete('/remove-subscription/:subscriptionId', authenticateToken, subscriptionController.removeSubscription);

module.exports = router;