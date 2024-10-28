var express = require('express');
var router = express.Router();
var loginController = require('../controller/loginController')
var signupController = require('../controller/signupController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login', loginController.getLoginInformation);

router.post('/signup', signupController.addNewUser);

module.exports = router;
