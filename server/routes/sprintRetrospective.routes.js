const AccessManager = require('../services/accessManager.service');
const express = require('express');
const SprintRetrospective = require('../services/sprintRetrospective.service');

const router = express.Router();

router.get('/:sprintID', SprintRetrospective.getAllSprintRetrospectiveItem);

router.get(
  '/project/:projectID',
  SprintRetrospective.getAllProjectsSprintRestrospective
);

router.post('/new', SprintRetrospective.createNewSprintRetrospective);

module.exports = router;
