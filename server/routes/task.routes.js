const AccessManager = require('../services/accessManager.service');
const express = require('express');
const Task = require('../services/task.service');

const router = express.Router();

router.post('/', Task.createTask);

router.get('/sprint/:sprintID', Task.getAllSprintTask);

router.get('/:sprintID/:userID', Task.getUserTasks);

router.get('/:projectID', Task.getProjectTasks);

router.patch('/', Task.updateStatus);

module.exports = router;
