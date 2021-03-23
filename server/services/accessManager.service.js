require('dotenv').config();

const jwt = require('jsonwebtoken');
const ProjectTeamModel = require('../models/projectTeam.model');

class AccessManager {
  getAdminPermission(request, response, next) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      if (decoded.userType === 'admin') next();
      else
        response.status(500).json({
          message: 'Requires admin privilege to this action',
        });
    } catch (error) {
      return response.status(401).json({
        message: 'Auth failed',
      });
    }
  }

  getUserPermission(request, response, next) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.JWT_KEY);
      next();
    } catch (error) {
      return response.status(500).json({
        message: 'Auth failed',
      });
    }
  }

  getProductOwnerPermissionLevel(request, response, next) {
    const projectID = request.body.projectID;
    const token = request.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (error) {
        return response.status(401).json({
          message: 'Auth failed',
        });
      }

      ProjectTeamModel.getProjectLevelAccess(
        decoded.userID,
        projectID,
        (error, result) => {
          if (Object.keys(error).length !== 0) {
            return response.status(500).json(error);
          }

          result[0].lvAccess === '01'
            ? next()
            : response
                .status(500)
                .json({ message: 'Requires Product Owner Permission' });
        }
      );
    });
  }

  getScrumMasterPermissionLevel(request, response, next) {
    const { projectID } = request.body;
    try {
      const token = request.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      ProjectTeamModel.getProjectLevelAccess(
        decoded.userID,
        projectID,
        (error, result) => {
          if (Object.keys(error).length !== 0) {
            return response.status(500).json(error);
          }

          result[0].lvAccess === '02'
            ? next()
            : response
                .status(500)
                .json({ message: 'Requires Scrum Master Permission' });
        }
      );
    } catch (error) {
      return response.status(401).json({
        message: 'Auth failed',
      });
    }
  }

  getDevTeamPermissionLevel(request, response, next) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      ProjectTeamModel.getProjectLevelAccess(
        decoded.userID,
        projectID,
        (error, result) => {
          if (Object.keys(error).length !== 0) {
            return response.status(500).json(error);
          }

          result[0].lvAccess === '03' || result[0].lvAccess === '04'
            ? next()
            : response
                .status(500)
                .json({ message: 'Requires Project Team Permission' });
        }
      );
    } catch (error) {
      return response.status(401).json({
        message: 'Auth failed',
      });
    }
  }
}

module.exports = new AccessManager();
