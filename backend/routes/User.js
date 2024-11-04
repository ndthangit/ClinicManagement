const express = require('express');
const router = express.Router();
const signup = require('../controller/Signup')
const  homeController = require('../controller/Home')

const signupController = require('../controller/Signup')
const userController = require('../controller/User')
const Login = require('../controller/Login')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/:table', homeController.getDataFromDB);

router.post('/signup', signup.addNewUser);
router.post('/login', Login.loginUser);
// router.get('/login', Login.loginUser);
router.get('/account/:id', Login.getAccountInfo);

router.get('/byId/:id', userController.getUserByID);

module.exports = router;