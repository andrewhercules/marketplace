var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/mycart', function(req, res, next) {
  res.render('mycart');
});

module.exports = router;
