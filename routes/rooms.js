const express = require('express');
const router = express.Router();

const roomController = require('../controllers/room');

// GET request to display list of all rooms
router.get('/', roomController.room_list_get);

// GET request for one Room.
router.get('/:id', roomController.room_detail_get);

module.exports = router;