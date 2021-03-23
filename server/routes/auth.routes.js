const express = require('express');
const AccessManager = require('../services/accessManager.service');
const AuthManager = require('../services/authManager.service');

const router = express.Router();

router.post('/login', AuthManager.logIn);

router.patch(
  '/change-password',
  AccessManager.getUserPermission,
  AuthManager.changePassword
);

router.post('/register', AuthManager.register);

module.exports = router;
