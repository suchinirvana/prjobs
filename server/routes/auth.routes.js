const express = require('express');
const router = express.Router();
const {authenticateToken } = require("../utils/token");
const uploadFile = require('../middleware/ImageUpload');
const {
    register,
    login,
    getById,
    update,
    userUploads,
    changePassword

  } = require('../controllers/auth.controller');
  
  router.post('/user/register', register);
  router.post('/user/login', login);

  //router.get('/current', authorize(), getCurrent);
  router.get('/user/:id', authenticateToken, getById);
  router.put('/user/:id', authenticateToken, update);
  router.post('/user/uploads', uploadFile.single("file"), userUploads);
  router.put('/user/changepassword/:id', authenticateToken, changePassword);

  module.exports = router;