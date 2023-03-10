const express = require('express');
const router = express.Router();
const {authenticateToken } = require("../utils/token");
const {
    getCountry, 
    getLanguages,
    getIndustries,
    getCities
  } = require('../controllers/misc.controller');
  
 
  router.get('/misc/country', authenticateToken, getCountry);
  router.get('/misc/languages', authenticateToken, getLanguages);
  router.get('/misc/industries', authenticateToken, getIndustries);
  router.get('/misc/cities', authenticateToken, getCities);
  

  //router.get('/employer/:id', authenticateToken, getEmployerById); 
  //router.put('/employer/:id', authenticateToken, updateEmployer);
  //router.post('/employer/uploads', uploadFile.single("file"), employerUploads);
  //router.get('/employer/all/:id', authenticateToken, getAllEmployer);  
 
  module.exports = router;