const UserModel = require('../models/user.model');
const ProjectTeamModel = require('../models/projectTeam.model');

class UserManager {
  getCurrentProjectDevTeam(request, response) {
    ProjectTeamModel.getProjectsDevTeam(
      request.params.projectID,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }

        response.status(200).json(result);
      }
    );
  }

  getProjectMemberByRole(request, response) {
    ProjectTeamModel.getProjectMemberByRole(
      request.params.projectID,
      request.params.lvAccess,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }
        response.status(200).json(result);
      }
    );
  }

  getUserIDByEmails(request, response) {
    UserModel.getUserIDByEmails(request.params.email, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }

  getUserByID(request, response) {
    UserModel.getUserByID(request.params.userID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }
}

module.exports = new UserManager();
