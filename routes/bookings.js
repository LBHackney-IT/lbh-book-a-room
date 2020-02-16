const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  const name = req.params.id;

  res.render('booking-form.html', {roomName: name, title: "Booking form"});
});

  module.exports = router;