var express = require('express');
var router = express.Router();
var homeController = require('../controller/homeController')
const connection = require('../DB/database')
var loginController = require('../controller/loginController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("  express");
});

router.get('/login', loginController.getLoginInformation);

module.exports = router;
