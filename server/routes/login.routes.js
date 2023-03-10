const express = require('express')
const router = express.Router()
const userController = require('../src/controllers/user.controller');

//Consultant login
router.post('/consultant', userController.loginConsultant);

module.exports = router