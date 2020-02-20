const express = require('express');
const router = express.Router();

const roomController = require('../controllers/room');

// GET request to display list of all rooms
router.get('/', roomController.room_list);

// GET request for one Room.
router.get('/:id', roomController.room_detail);

module.exports = router;