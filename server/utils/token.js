const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const TOKEN_SECRET = process.env.TOKEN_SECRET;

const generateAccessToken = (user)=>{
    const id = user.id;
    const expiresIn = '1d';
    const payload = {
        sub: id,
        role: user.user_type,
        iat: Date.now()
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn : expiresIn})
}


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err , user ) => {
    console.log(err);
    if(err) return res.sendStatus(403)
    req.user = user
    next()   
    })
}


module.exports.generateAccessToken = generateAccessToken;
module.exports.authenticateToken = authenticateToken;


