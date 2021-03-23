const UserStoryModel = require('../models/userStory.model');

class UserStory {
  createUserStory(request, response) {
    const { PBItemID, sprintID, description } = request.body;

    if (!description)
      return response
        .status(500)
        .json({
          title: 'Failed to create user story',
          message:
            "User story's description is empty. Please specify the description",
        });
    UserStoryModel.createUserStory(
      PBItemID,
      sprintID,
      description,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }
        response.status(200).json(result);
      }
    );
  }

  getAllSprintUserStory(request, response) {
    UserStoryModel.getAllSprintUserStory(
      request.params.sprintID,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }
        response.status(200).json(result);
      }
    );
  }

  getUserStory(request, response) {
    UserStoryModel.getUserStory(request.params.userStoryID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }
}

module.exports = new UserStory();
