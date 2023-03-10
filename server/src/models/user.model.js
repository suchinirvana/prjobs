var db = require('../../config/db.config');
const bcrypt = require('bcrypt');
const utils = require('../../utils')
const hashRound = require('../../utils').hashRound

var User = function(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = createHashedPassword(user.password);
    this.contactNumber = user.contactNumber;
}

function createHashedPassword(password) {
    try {
        const hashedPassword = bcrypt.hashSync(password, hashRound)
        return hashedPassword;
    } catch {
        console.log("Can't create secured password")
    }
};

//Constructor
User.create = function(newUser, result) {
    db.query('INSERT INTO users set ?', 
            newUser,
            function(err, res) {
                if (err) result(err,null)
                else {
                    result(null, res)
                }
            }
    ) 
}

//Get all users
User.findAll = function(result) {
    db.query("SELECT * FROM users", 
            (err, res) => {
            if (err) {
                console.log(err)
                result(err, null)
                }
            else {
                result(null, res)
            }
    })
}

User.findById = function (id, result) {
    console.log("find By ID", id)
    if (id){
        db.query('SELECT * FROM users where id = ?',
            id,(err, res) => {
                if (err) {
                    console.log("error: ", err)
                    result(err, null)
                }
                else result(null, res);
        })
    }
    else result(null,null)
}

User.findByUsername = function (username, result) {
    db.query('SELECT * FROM users where username = ?',
        username,(err, res) => {
            if (err) result(err, null)
            else {
                result(null,res);
            }
    })
}

module.exports = User;




