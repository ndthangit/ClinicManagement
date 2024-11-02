const express = require('express');
const router = express.Router();
const signup = require('../controller/Signup')
const  homeController = require('../controller/Home')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/:table', homeController.getDataFromDB);

router.post('/signup', signup.addNewUser);

module.exports = router;