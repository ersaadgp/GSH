const express = require('express');
const Project = require('../services/project.service');
const AccessManager = require('../services/accessManager.service');
const UserManager = require('../services/userManager.service');

const router = express.Router();

router.post('/team', Project.addProjectTeam);

router.get('/access/:projectID/:userID', Project.getProjectLevelAccess);

router.post('/', Project.createNewProject);

router.get('/team/:projectID', Project.getAllProjectMember);

router.patch('/team', Project.deleteProjectMember);

router.patch('/:projectID', Project.endProject);

router.patch('/team/:projectID', Project.changeProjectTeamRole);

router.get('/active', Project.getActiveProject);

router.get('/finished/detail/:projectID', Project.getProjectsDetail);

router.get(
  '/product-owner-and-scrum-master/:projectID',
  Project.getProjectsProductOwnerAndScrumMaster
);

router.get('/finished', Project.getAllFinishedProject);

router.get('/product-owner/:userID', Project.getProjectsProductOwner);

router.get('/:userID', Project.getWorkingProject);

module.exports = router;
