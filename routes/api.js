var express = require('express');
var router = express.Router();
var database = require('../inventoryDatabase');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var currentInventory = new database;
  res.send(currentInventory.items);
});

module.exports = router;
