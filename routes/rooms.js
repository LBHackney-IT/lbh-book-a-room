const express = require('express');
const router = express.Router();

const roomController = require('../controllers/room');

// GET request to display details of one room.
router.get('/:id', roomController.room_detail_get);

module.exports = router;