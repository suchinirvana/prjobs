const express = require('express');
const router = express.Router();
const {authenticateToken } = require("../utils/token");
//const uploadFile = require('../middleware/ImageUpload');
const {
  updateJob
  } = require('../controllers/jobseeker.controller');


  //router.get('/job/:id', authenticateToken, getById); 
  router.put('/jobseeker/:id', authenticateToken, updateJob);
  //router.get('/job/all/:id', authenticateToken, getAll);    
 
  module.exports = router;