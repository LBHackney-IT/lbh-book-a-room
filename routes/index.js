const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

// GET request for new booking form.
router.get('/', indexController.index);

module.exports = router;