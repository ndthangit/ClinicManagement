var express = require('express');
var router = express.Router();
var homeController = require('../controller/homeController')
const {response} = require("express");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("  express");
});

module.exports = router;
