const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.render('index.njk', {title: 'Hackney Book A Room | Home'});    
});

module.exports = router;