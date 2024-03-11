const express = require('express');
const router = express.Router();
const usernameController = require('../controllers/usernameController');
const authenticateToken = require('../middleware/authenticateToken');

// Route to get the username, using the authenticateToken middleware
router.get('/username', authenticateToken, usernameController.getUsername);

module.exports = router;
