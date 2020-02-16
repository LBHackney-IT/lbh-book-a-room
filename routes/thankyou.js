var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  const name = req.params.id;

  res.render('thank-you.html', {roomName: name, title: "Thank you"});
});

module.exports = router;