const SprintRetrospectiveModel = require('../models/SprintRetrospective.model');

class SprintRetrospective {
  createNewSprintRetrospective(request, response) {
    const {
      userID,
      sprintID,
      messageHaveToKeep,
      messageHaveToChange,
      messageHaveToStart,
    } = request.body;
    SprintRetrospectiveModel.createNewSprintRetrospectiveItem(
      userID,
      sprintID,
      messageHaveToKeep,
      messageHaveToChange,
      messageHaveToStart,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }
        response.status(200).json(result);
      }
    );
  }

  getAllSprintRetrospectiveItem(request, response) {
    const { sprintID } = request.params;
    SprintRetrospectiveModel.getAllSprintRetrospectiveItem(
      sprintID,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }
        response.status(200).json(result);
      }
    );
  }

  getAllProjectsSprintRestrospective(request, response) {
    const { projectID } = request.params;
    SprintRetrospectiveModel.getAllProjectsSprintRestrospective(
      projectID,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }
        response.status(200).json(result);
      }
    );
  }
}

module.exports = new SprintRetrospective();
