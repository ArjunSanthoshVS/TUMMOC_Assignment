var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.get('/google',userController.google)
router.post('/city',userController.city)
router.get('/cities',userController.cities)

module.exports = router;
