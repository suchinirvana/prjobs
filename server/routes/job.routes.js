const express = require('express');
const router = express.Router();
const {authenticateToken } = require("../utils/token");
//const uploadFile = require('../middleware/ImageUpload');
const {
    addJob,
    updateJob,
    getById,
    getAll,
    deleteJob,
    getAllByUser,
    recommendedJob,
    getFilterJob,
    applyForJob,
    getJobApplications,
    updateApplicationsStatus

  } = require('../controllers/job.controller');
  

  router.post('/job/add', authenticateToken, addJob);
  router.get('/job/:id', authenticateToken, getById); 
  router.put('/job/:id', authenticateToken, updateJob);
  router.get('/job/all/:id', authenticateToken, getAllByUser);  
  router.get('/alljobs', getAll); 
  router.delete('/job/:id', authenticateToken, deleteJob);  
  router.post('/job/recmjob', authenticateToken, recommendedJob);
  router.post('/alljobs', getFilterJob);
  router.post('/job-apply', authenticateToken, applyForJob);
  router.post('/job-applications', authenticateToken, getJobApplications);
  router.post('/job-applications-status', authenticateToken, updateApplicationsStatus);
  
  
  

  
 
  module.exports = router;