const express = require('express');
const AccessManager = require('../services/accessManager.service');
const UserManager = require('../services/userManager.service');
const Project = require('../services/project.service');

const router = express.Router();

router.get('/project/:projectID', UserManager.getCurrentProjectDevTeam);

router.get('/:lvAccess/:projectID', UserManager.getProjectMemberByRole);

module.exports = router;
