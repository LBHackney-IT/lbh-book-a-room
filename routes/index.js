const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

// GET request for new booking form.
router.get('/', indexController.all_rooms_get);

module.exports = router;