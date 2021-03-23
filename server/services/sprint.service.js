const SprintModel = require('../models/sprint.model');

class Sprint {
  initiateSprint(request, response) {
    SprintModel.initiateSprint(request.params.projectID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      response.status(200).json(result);
    });
  }

  editSprint(request, response) {
    const { sprintGoal, dueDate, sprintID } = request.body;
    SprintModel.editSprint(sprintGoal, dueDate, sprintID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      response.status(200).json(result);
    });
  }

  endSprint(request, response) {
    SprintModel.endSprint(request.body.sprintID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }

  getCurrentProjectSprint(request, response) {
    SprintModel.getProjectsSprint(request.params.projectID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      response.status(200).json(result);
    });
  }

  getSprint(request, response) {
    SprintModel.getSprint(request.params.sprintID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }

  getAllSprint(request, response) {
    SprintModel.getAllSprint(request.params.projectID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }

  getReadyProjects(request, response) {
    SprintModel.getReadyProjects(request.params.projectID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }

  startSprint(request, response) {
    const { sprintGoal, dueDate, sprintID } = request.body;

    if (!sprintGoal)
      return response.status(500).json({
        title: 'Sprint failed to start.',
        message: 'Please specify your sprint goal',
      });

    if (!dueDate)
      return response.status(500).json({
        title: 'Sprint failed to start.',
        message: 'Please specify your sprint due date',
      });

    SprintModel.startSprint(sprintGoal, dueDate, sprintID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }
}

module.exports = new Sprint();
