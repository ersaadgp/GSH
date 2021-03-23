const AccessManager = require('../services/accessManager.service');
const express = require('express');
const UserStory = require('../services/userStory.service');

const router = express.Router();

router.post('/', UserStory.createUserStory);

router.get('/:userStoryID', UserStory.getUserStory);

router.get('/sprint/:sprintID', UserStory.getAllSprintUserStory);

module.exports = router;
