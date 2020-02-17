const express = require('express');
const router = express.Router();

const room_controller = require('../controllers/roomController.js');

// GET request to display list of all rooms
router.get('/', room_controller.room_list);

// GET request for one Room.
router.get('/:id', room_controller.room_detail);

module.exports = router;