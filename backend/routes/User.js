const express = require('express');
const router = express.Router();
const  homeController = require('../controller/Home')
const signupController = require('../controller/Signup')
const userController = require('../controller/User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/:table', homeController.getDataFromDB);

router.post('/signup', signupController.addNewUser);

router.get('/byId/:id', userController.getUserByID);

module.exports = router;