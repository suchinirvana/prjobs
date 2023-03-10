const User = require('../models/user.model')
const Consultant = require('../models/consultant.model')
const ROLE = require('../roles')
const utils = require('../../utils')
//Retrieve all users
exports.findAll = function(req, res) {
    User.findAll(function(err, user) {
        if (err) res.send(err);
        else{
            res.send(user);
        }
    })
}

//Find a user by id
exports.findById = function(req, res) {
    User.findById(req.params.id, function(err, user){
        if (err) res.send(err);
        else res.json(user);
    })
}

//Find a user by id
exports.findByUsername = function(req, res) {
    User.findByUsername(req.params.username, function(err, user){
        if (err) res.send(err);
        else res.json(user);
    })
}

//Add new user
exports.create = function(req, res) {
    const newUser = new User(req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({
            error: true,
            message: "Please provide all the required fields"
        })
    }
    else {
        User.create(newUser, function(err, response){
            if (err) res.send(err)
            res.status(200).json({
                error: false,
                message: "User Added Successfully"
            })
        })
        //TODO: check if the user already in the system
    }
}

exports.loginConsultant = function(req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({
            error: true,
            message: "Please provide all the required fields"
        })
    }
    else {
        User.findByUsername(req.body.username, function(err, existingUser){
            if (err) res.send(err)
            console.log(req.body.username)
            console.log(existingUser)
            if (existingUser[0]){
                const isValid = utils.isValidPassword(req.body.password, existingUser[0].password)
                if (isValid){
                    //Pull consultant info
                    console.log("EXIST" , existingUser[0])
                    Consultant.findByEmail(existingUser[0].email, function(err, existingConsultant){
                        if (err) {
                            res.send(err)
                        }
                        else if (existingConsultant[0] == null) {
                            res.status(401).send({
                                error: true,
                                message: "Consultant not found"
                            })
                        }
                        else {
                           console.log("Consultant ", existingConsultant[0])
                           const roleId = existingConsultant[0].id
                           const authorization = [ROLE.USER, ROLE.CONSULTANT]
                           const tokenObject = utils.issueJWT(existingUser[0], roleId, authorization)

                           res.status(200).json({
                                error: false,
                                message: "Retrieved user data successfully",
                                data: tokenObject
                           })
                        }
                    })
                    
                }
                else {
                    res.status(401).json({
                        error: true,
                        message: "Invalid credentials"
                    })
                }
                
                //TODO: storing refresh token in db and issue a new access token whenever user
                //submit POST request to /token with their current refresh token
                // else {
                //     if (res.insertId){
                //         newUser.id = res.insertId
                //         const jwt = utils.issueJWT(newUser)
                //         const jwtObject = {
                //             id: newUser.id,
                //             token: jwt.token,
                //             expiresIn: jwt.expires
                //         }
                //     //Issue JWT Token
                //         db.query('INSERT INTO jwtTokens set ?',
                //             jwtObject,
                //             function(err, res){
                //                 if (err) result (err, null)
                //                 else result(null, jwtObject);
                //             }
                //         )
                //     }
                // }
            }
            else {
                res.status(401).send({
                    error: true,
                    message: "User not found"
                })
            }
        })
    }
}