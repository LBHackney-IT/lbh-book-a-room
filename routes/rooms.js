var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
  const name = req.params.id;

  res.render('room.html', {roomName: name, title: name});
});

module.exports = router;