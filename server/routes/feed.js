const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/update', authenticateToken, feedController.updateFeed);



module.exports = router;