const TaskModel = require('../models/task.model');
const UsersTaskModel = require('../models/usersTask.models');

class Task {
  createTask(request, response) {
    const {
      userStoryID,
      description,
      fibonacciPoint,
      picID,
      reviewerID,
      dueDate,
    } = request.body;

    if (!description)
      return response.status(500).json({
        title: 'Failed to create task',
        message: "Task's description is empty. Please specify the description",
      });

    if (!fibonacciPoint)
      return response.status(500).json({
        title: 'Failed to create task',
        message: "Task's scope is empty. Please specify the scope",
      });

    if (!picID)
      return response.status(500).json({
        title: 'Failed to create task',
        message: "Task's PIC is empty. Please specify the PIC",
      });

    if (!dueDate)
      return response.status(500).json({
        title: 'Failed to create task',
        message: "Task's due date is empty. Please specify the due date",
      });

    TaskModel.createTask(
      userStoryID,
      description,
      fibonacciPoint,
      dueDate,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }
        const {
          taskID,
          userStoryID,
          description,
          fibonacciPoint,
          dueDate,
          status,
        } = result[0];

        UsersTaskModel.insertPIC(taskID, picID, (error, result) => {
          if (Object.keys(error).length !== 0) {
            return response.status(500).json(error);
          }

          UsersTaskModel.insertPIC(taskID, reviewerID, (error, result) => {
            if (Object.keys(error).length !== 0) {
              return response.status(500).json(error);
            }
            response.status(200).json({
              taskID,
              userStoryID,
              description,
              fibonacciPoint,
              dueDate,
              status,
            });
          });
        });
      }
    );
  }

  assignTask(request, response) {
    const { picID, dueDate, fibonacciPoint, taskID } = request.body;
    TaskModel.assignTask(
      picID,
      dueDate,
      fibonacciPoint,
      taskID,
      (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }
        response.status(200).json(result);
      }
    );
  }

  getAllSprintTask(request, response) {
    const sprintID = request.params.sprintID;
    TaskModel.getAllSprintTask(sprintID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }

  getUserTasks(request, response) {
    const { sprintID, userID } = request.params;
    UsersTaskModel.getSprintUsersTask(sprintID, userID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }

  getProjectTasks(request, response) {
    const projectID = request.params.projectID;
    TaskModel.getProjectTask(projectID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }

  getTaskByID(request, response) {
    const taskID = request.params.taskID;
    TaskModel.getTaskByID(taskID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      response.status(200).json(result);
    });
  }

  updateStatus(request, response) {
    const { newStatus, taskID, userID } = request.body;
    UsersTaskModel.getUsersTask(taskID, userID, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      const task = result[0];

      if (newStatus === task.status) {
        return response.status(500).json({
          message: `task status is already in status '${task.status}'`,
        });
      }

      switch (newStatus) {
        case 'to do':
          TaskModel.updateStatus(taskID, newStatus, (error, result) => {
            if (Object.keys(error).length !== 0) {
              return response.status(500).json(error);
            }

            const { taskID, description, status, dueDate } = result[0];
            const now = new Date();
            let duration = task.duration;

            if (task.revisionDate === null) {
              const startDate = new Date(task.startDate);
              const diffTime = Math.abs(now - startDate);
              duration += Math.ceil(diffTime / (1000 * 60));
            } else {
              const revisionDate = new Date(task.revisionDate);
              const diffTime = Math.abs(now - revisionDate);
              duration += Math.ceil(diffTime / (1000 * 60));
            }

            UsersTaskModel.updateEndDateUsersTask(
              taskID,
              userID,
              duration,
              (error, result) => {
                if (Object.keys(error).length !== 0) {
                  return response.status(500).json(error);
                }

                response
                  .status(200)
                  .json({ taskID, description, status, dueDate });
              }
            );
          });
          break;
        case 'on progress':
        case 'on review':
          TaskModel.updateStatus(taskID, newStatus, (error, result) => {
            if (Object.keys(error).length !== 0) {
              return response.status(500).json(error);
            }

            const { taskID, description, status, dueDate } = result[0];

            if (task.startDate === null) {
              UsersTaskModel.updateStartDateUsersTask(
                taskID,
                userID,
                (error, result) => {
                  if (Object.keys(error).length !== 0) {
                    return response.status(500).json(error);
                  }

                  response
                    .status(200)
                    .json({ taskID, description, status, dueDate });
                }
              );
            } else {
              UsersTaskModel.updateRevisionDateUsersTask(
                taskID,
                userID,
                (error, result) => {
                  if (Object.keys(error).length !== 0) {
                    return response.status(500).json(error);
                  }

                  response
                    .status(200)
                    .json({ taskID, description, status, dueDate });
                }
              );
            }
          });
          break;
        case 'complete':
        case 'done':
          TaskModel.updateStatus(taskID, newStatus, (error, result) => {
            if (Object.keys(error).length !== 0) {
              return response.status(500).json(error);
            }

            const { taskID, description, status, dueDate } = result[0];
            const now = new Date();
            let duration = task.duration;

            if (task.revisionDate === null) {
              const startDate = new Date(task.startDate);
              const diffTime = Math.abs(now - startDate);
              duration += Math.ceil(diffTime / (1000 * 60));
            } else {
              const revisionDate = new Date(task.revisionDate);
              const diffTime = Math.abs(now - revisionDate);
              duration += Math.ceil(diffTime / (1000 * 60));
            }

            UsersTaskModel.updateEndDateUsersTask(
              taskID,
              userID,
              duration,
              (error, result) => {
                if (Object.keys(error).length !== 0) {
                  return response.status(500).json(error);
                }

                response
                  .status(200)
                  .json({ taskID, description, status, dueDate });
              }
            );
          });
          break;
        default:
          response.status(500).json({ message: 'Error occur' });
          break;
      }
    });
  }
}

module.exports = new Task();
