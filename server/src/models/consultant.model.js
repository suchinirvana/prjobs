var db = require('../../config/db.config');

var Consultant = function(consultant) {
    this.companyName = consultant.companyName;
    this.email = consultant.email;
    this.contactNumber = consultant.contactNumber;
    // this.employerAuthorization = consultant.employerAuthorization;
    // this.employerId = consultant.employerId;
}
//Constructor
Consultant.create = function(newConsultant, result) {
    db.query('INSERT INTO consultants set ?', 
            newConsultant, 
            function(err, res) {
                if (err) {
                    console.log(err)
                    result(err,null)
                }
                else {
                    result(null, res.id);
                }
    })
}

//Get all consultants
Consultant.findAll = function(result) {
    db.query("SELECT * FROM consultants", 
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

Consultant.findById = function (id, result) {
    console.log("i'm here id")
    db.query('SELECT * FROM consultants where id = ?',
            id,(err, res) => {
                if (err) result(err, null)
                else result(null, res);
    })
}

Consultant.findByEmail = function (email, result) {
    console.log("i'm here email")
    db.query('SELECT * FROM consultants where email = ?',
            email,(err, res) => {
                if (err) result(err, null)
                else result(null, res);
    })
}


// Consultant.update = function(id, consultant, result) {
//     db.query("UPDATE consultants SET name=?,companyName=?,email=?,contactNumber=? WHERE id=?",
//             [consultant.name, consultant.companyName, consultant.email, consultant.contactNumber],
//             (err, res) => {
//             if (err) {
//                 console.log(err)
//                 result(err, null)
//             }
//             else {
//                 result(null, res)
//             }
//     })
// }

// Consultant.delete = function(id,result) {
//     db.query("DELETE FROM consultants WHERE id=?", 
//             id,
//             function(err, res) {
//         if (err) {
//             console.log(err)
//             result(null,err)
//         }
//         else {
//             result(null, res)
//         }
//     })
// }

module.exports = Consultant;




