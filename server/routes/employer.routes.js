const express = require('express');
const router = express.Router();
const {authenticateToken } = require("../utils/token");
const uploadFile = require('../middleware/ImageUpload');
const {
    addEmployer,
    updateEmployer,
    getEmployerById,
    employerUploads,
    getAllEmployer,
    deleteEmployer,
    test
  } = require('../controllers/employer.controller');
  
  router.post('/employer', authenticateToken, test);

  router.post('/employer/add', authenticateToken, addEmployer);
  router.get('/employer/:id', authenticateToken, getEmployerById); 
  router.put('/employer/:id', authenticateToken, updateEmployer);
  router.post('/employer/uploads', uploadFile.single("file"), employerUploads);
  router.get('/employer/all/:id', authenticateToken, getAllEmployer);  
  router.delete('/employer/:id', authenticateToken, deleteEmployer); 
  
 
  module.exports = router;