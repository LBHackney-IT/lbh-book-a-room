const express = require('express');
const router = express.Router();

const confirmationController = require('../controllers/confirmation');

// GET request for the confirmation page.
router.get('/', confirmationController.confirmation);

module.exports = router;