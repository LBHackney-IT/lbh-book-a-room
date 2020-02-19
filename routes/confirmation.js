const express = require('express');
const router = express.Router();

const confirmation_controller = require('../controllers/confirmationController.js');

// GET request for the confirmation page.
router.get('/', confirmation_controller.confirmation);

module.exports = router;