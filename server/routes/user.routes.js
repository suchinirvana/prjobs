const express = require('express')
const router = express.Router()
const userController = require('../src/controllers/user.controller');
const passport = require('passport');
const utils = require('../utils')
/** 
 * User Authentication Routes
*/

// //Retrieve a user
// router.get('/:username', userController.findByUsername);

// //Retrieve a user
// router.get('/:id', userController.findById);

//Test protected routes
//WIP: passport.authenticate not calling JwtStrategy
router.get('/protected', passport.authenticate('LoginJwtStrategy', {
    //Remove passportJS session
    session: false
    }), (req,res, next) => { 
    res.status(200).json({
        error: false,
        message: "You are user"
    })
})

module.exports = router