const express = require('express')
const router = express.Router()
const userController = require('../src/controllers/user.controller');
// const consultantRoute = require('../routes/consultant.routes');
const consultantController = require('../src/controllers/consultant.controller');

//Register new user
router.post('/user', userController.create);

//Register new consultant
router.post('/consultant', consultantController.create);

// //Register new employer
// router.post('/employer', employerController.create);

// //Register new job seeker
// router.post('/job-seeker', jobSeekerController.create);

// //Register new super admin
// router.post('/superAdmin', superAdminController.create);

// //Register new manager
// router.post('/manager', managerController.create);

// //Register new representative
// router.post('/representative', representativeController.create);

module.exports = router