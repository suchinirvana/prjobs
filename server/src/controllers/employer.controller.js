const Employer = require('../models/employer.model')

//Retrieve all consultants
exports.findAll = function(req, res) {
    Employer.findAll(function(err, consultant) {
        if (err) res.send(err);
        else{
            res.send(consultant);
        }
    })
}

//Add new consultant
exports.create = function(req, res) {
    const newConsultant = new Consultant(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({
            error: true,
            message: "Please provide all the required fields"
        })
    }
    else {
        Consultant.create(newConsultant, function(err, consultant) {
            if (err) {
                res.send(err);
                console.log("Error")
            }
            else {
                res.json({
                    message: "Consultant added successfully"
                })   
            }
            
        })
    }
}