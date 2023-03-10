const jsonwebtoken = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const pathToKey = path.join(__dirname, '', 'id_rsa_priv.pem')
const PRIVATE_KEY = fs.readFileSync(pathToKey, 'utf8')
const hashRound = 10;
const bcrypt = require('bcrypt')

function issueJWT(user, roleId, authorization) {
    const id = user.id;

    const expiresIn = '1d';

    const payload = {
        sub: id,
        roleId: roleId,
        authorization: authorization,
        iat: Date.now()
    }
    console.log("payload ", payload)
    const signedToken = jsonwebtoken.sign(
        payload, PRIVATE_KEY, {
            expiresIn: expiresIn,
            algorithm: 'RS256'
            })
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

function isValidPassword(submittedPassword, existingPassword){
    return bcrypt.compareSync(submittedPassword, existingPassword)
}

module.exports.issueJWT = issueJWT;
module.exports.isValidPassword = isValidPassword;
module.exports.hashRound = hashRound;