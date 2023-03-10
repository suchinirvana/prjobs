// const localStrategy = require('passport-local').Strategy
// const User = require("../src/models/user.model")

// function initialize(passport) {
//     const authenticateUser = (username, password, done) => {
//         User.findByUsername(username, function (err, user) {
//             console.log(user[0])
//             if (err) return done(err);
//             if (!user) return done(null, false, {message: 'no user found'})
//             try {
//                 if (bcrypt.compareSync(password, user[0].password)){
//                     return done(null, user[0])
//                 }
//                 else {
//                     return done(null, false, {message: 'Password incorrect'})
//                 }
//             } catch (e) { return done(e) }   
//         })}
    
//     passport.use(new localStrategy(authenticateUser))
//     passport.serializeUser((user, done) => {
//         done(null, user.id)
//     })
//     passport.deserializeUser((id, done) => {
//         User.findById(id, function (err, user) {
//             return done(err, user)
//         })
//     })
// }

// module.exports = initialize

const fs = require('fs');
const path = require('path')
const User = require("../src/models/user.model")
const Consultant = require("../src/models/consultant.model")
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const bcrypt = require('bcrypt')
// const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem')
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem')
const PUBLIC_KEY = fs.readFileSync(pathToKey, 'utf8')

const passportJWTOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUBLIC_KEY,
    algorithm: ['RS256']
};

const loginStrategy = new JwtStrategy(passportJWTOptions, (payload, done) => {
    User.findById(payload.sub, function (err, user) {
        console.log(user[0])
        if (err) {
            return done(err, null)
        };
        if (user[0]) return done(null, user[0])
        else return done(null, false)
        // //Exist a user
        // try {
        //     if (bcrypt.compareSync(password, user[0].password)){
        //         console.log("I'm here")
        //         return done(null, {message: 'You are good then.'})
        //     }
        //     else {
        //         return done(null, false, {message: 'Password incorrect'})
        //     }
        // } catch (err) { return done(err, null) }
    });
})

const consultantStrategy = new JwtStrategy(passportJWTOptions, (payload, done) => {
    Consultant.findById(payload.roleId, function (err, consultant) {
        console.log(consultant[0])
        if (err) {
            return done(err, null)
        };
        if (consultant[0]) return done(null, consultant[0])
        else return done(null, false)
    });
})

module.exports = (passport) => {
    passport.use('LoginJwtStrategy', loginStrategy);
    passport.use('ConsultantJwtStrategy', consultantStrategy);
}

