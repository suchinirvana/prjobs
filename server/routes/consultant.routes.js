const express = require('express')
const router = express.Router()
const consultantController = require('../src/controllers/consultant.controller');
const passport = require('passport');

//Retrieve all consultants
router.get('/all', consultantController.findAll);
// //Retrieve a consultant

router.get('/protected', passport.authenticate('ConsultantJwtStrategy', {
    //Remove passportJS session
    session: false
    }), (req,res, next) => { 
    res.status(200).json({
        error: false,
        message: "You are consultant"
    })
})

module.exports = router