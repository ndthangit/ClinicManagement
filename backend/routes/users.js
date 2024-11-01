var express = require('express');
var router = express.Router();
var  homeController = require('../controller/homeController')
var signupController = require('../controller/signupController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// router.get('/:table', homeController.getDataFromDB);

router.post('/signup', signupController.addNewUser);

module.exports = router;
