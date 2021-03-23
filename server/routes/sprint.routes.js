const AccessManager = require('../services/accessManager.service');
const express = require('express');
const Sprint = require('../services/sprint.service');

const router = express.Router();

router.get('/:sprintID', Sprint.getSprint);

router.get('/project/:projectID', Sprint.getCurrentProjectSprint);

router.patch('/end', Sprint.endSprint);

router.patch('/start', Sprint.startSprint);

router.get('/ready/:projectID', Sprint.getReadyProjects);

router.post('/init/:projectID', Sprint.initiateSprint);

router.get('/all/:projectID', Sprint.getAllSprint);

module.exports = router;
