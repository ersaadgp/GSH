const ProjectModel = require('../models/project.model');
const ProjectTeamModel = require('../models/projectTeam.model');
const SprintModel = require('../models/sprint.model');
const TaskModel = require('../models/task.model');
const UserModel = require('../models/user.model');
const EmailService = require('./email.service');

class Project {
  addProjectTeam(request, response) {
    const { email, projectID, lvAccess } = request.body;
    UserModel.getUserByUsernameOrEmail(email, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      const { userID, userName } = result[0];

      ProjectTeamModel.addProjectTeam(
        userID,
        projectID,
        lvAccess,
        (error, result) => {
          if (Object.keys(error).length !== 0) {
            return response.status(500).json(error);
          }
          response.status(200).json({ userID, userName, lvAccess });
        }
      );
    });
  }

  changeProjectTeamRole(request, response) {
    UserModel.getUserByID(request.body.userID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      const userName = result[0].userName;

      ProjectTeamModel.updateProjectTeamRole(
        request.body.lvAccess,
        request.body.projectID,
        request.body.userID,
        (error, result) => {
          if (Object.keys(error).length !== 0) {
            return response.status(500).json(error);
          }
          const { userID, lvAccess } = result[0];
          response.status(200).json({ userID, userName, lvAccess });
        }
      );
    });
  }

  createNewProject(request, response) {
    const {
      projectName,
      projectDueDate,
      productOwner,
      scrumMaster,
      tester,
      devTeam,
    } = request.body;

    if (!projectName)
      return response.status(500).json({
        title: 'Failed to create project',
        message: 'Project name is required. Please enter your project name.',
      });

    if (!projectDueDate)
      return response.status(500).json({
        title: 'Failed to create project',
        message:
          'Project due date is required. Please enter your project due date.',
      });

    if (!productOwner || !scrumMaster || !tester || !devTeam.length)
      return response.status(500).json({
        title: 'Failed to create project',
        message:
          'Project team is required (seems like Product owner/Scrum master/Tester/Dev. Team is not specified). Please enter your project name.',
      });

    ProjectModel.getAvailableProjectName(projectName, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      const { exists } = result[0];
      if (exists === true) {
        return response.status(454).json({
          title: 'Failed to create project',
          message:
            'Project name already exist. Please user another project name.',
        });
      } else {
        let project;
        var userEmails = [];

        userEmails.push(productOwner);
        userEmails.push(scrumMaster);
        userEmails.push(tester);
        userEmails = userEmails.concat(devTeam);

        ProjectModel.createNewProject(
          projectName,
          projectDueDate,
          (error, result) => {
            if (Object.keys(error).length !== 0) {
              return response.status(500).json(error);
            }

            project = result[0];

            UserModel.getUserIDByEmails(userEmails, (error, result) => {
              if (Object.keys(error).length !== 0) {
                return response.status(500).json(error);
              }

              const userIDs = result.map((v) => {
                return v.userID;
              });

              ProjectTeamModel.insertProjectTeam(
                project.projectID,
                userIDs,
                (error, result) => {
                  if (Object.keys(error).length !== 0) {
                    return response.status(500).json(error);
                  }

                  EmailService.send(userEmails);

                  response.status(200).json({ project });
                }
              );
            });
          }
        );
      }
    });
  }

  deleteProjectMember(request, response) {
    const { userID, projectID } = request.body;

    ProjectTeamModel.deleteProjectMember(userID, projectID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }

  endProject(request, response) {
    ProjectModel.endProject(request.params.projectID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }

  getActiveProject(request, response) {
    ProjectModel.getActiveProject((error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      response.status(200).json(result);
    });
  }

  getProjectsDetail(request, response) {
    const projectID = request.params.projectID;

    ProjectModel.getProjectById(projectID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      const {
        projectID,
        projectName,
        projectStartDate,
        projectEndDate,
        projectEstEndDate,
      } = result[0];

      ProjectModel.getTotalManHour(projectID, (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }

        const totalManHour = result[0].sum;

        SprintModel.getTotalSprint(projectID, (error, result) => {
          if (Object.keys(error).length !== 0) {
            return response.status(500).json(error);
          }

          const totalSprint = result[0].count;

          TaskModel.getTotalTask(projectID, (error, result) => {
            if (Object.keys(error).length !== 0) {
              return response.status(500).json(error);
            }

            const totalTask = result[0].count;

            response.status(200).json({
              projectID,
              projectName,
              projectStartDate,
              projectEndDate,
              projectEstEndDate,
              totalManHour,
              totalSprint,
              totalTask,
            });
          });
        });
      });
    });
  }

  getProjectsProductOwnerAndScrumMaster(request, response) {
    const projectID = request.params.projectID;
    ProjectTeamModel.getProjectsProductOwnerAndScrumMaster(
      projectID,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }

        response.status(200).json(result);
      }
    );
  }

  getProjectLevelAccess(request, response) {
    const { projectID, userID } = request.params;
    ProjectTeamModel.getProjectLevelAccess(
      userID,
      projectID,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }
        response.status(200).json(result);
      }
    );
  }

  getAllProjectMember(request, response) {
    ProjectTeamModel.getAllProjectMember(
      request.params.projectID,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }
        response.status(200).json(result);
      }
    );
  }

  getProjectsProductOwner(request, response) {
    const userID = request.params.userID;

    UserModel.getUserByID(userID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      const { userType } = result[0];

      if (userType === 'admin') {
        ProjectTeamModel.getAllProjectsProductOwner((error, result) => {
          if (Object.keys(error).length !== 0) {
            return response.status(500).json(error);
          }

          response.status(200).json(result);
        });
      } else {
        ProjectTeamModel.getProjectsProductOwner(userID, (error, result) => {
          if (Object.keys(error).length !== 0) {
            return response.status(500).json(error);
          }

          response.status(200).json(result);
        });
      }
    });
  }

  getAllFinishedProject(request, response) {
    ProjectModel.getAllFinishedProject((error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }

  getUserAccessLevel(request, response) {
    const userID = request.body.userID;
    ProjectTeamModel.getUserAccessLevel(userID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }

  getWorkingProject(request, response) {
    const userID = request.params.userID;
    ProjectModel.getWorkingProject(userID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      response.status(200).json(result);
    });
  }
}

module.exports = new Project();
