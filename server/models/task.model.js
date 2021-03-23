const db = require('../config');

class TaskModel {
  createTask(userStoryID, description, fibonacciPoint, dueDate, callback) {
    db.query(
      `INSERT INTO task ("taskID", "userStoryID", description, "fibonacciPoint", "dueDate", status) VALUES (next_task_id($1), ($1), ($2), ($3), ($4), 'to do') RETURNING *`,
      [userStoryID, description, fibonacciPoint, dueDate],
      callback
    );
  }

  getAllSprintTask(sprintID, callback) {
    db.query(
      'select * from task where task."userStoryID" in (select "userStory"."userStoryID" from "userStory" where "sprintID" = ($1))',
      [sprintID],
      callback
    );
  }

  getTaskByID(taskID, callback) {
    db.query(
      'select * from task where task."taskID" = ($1)',
      [taskID],
      callback
    );
  }

  updateStatus(taskID, status, callback) {
    db.query(
      'update task set status = ($2) where "taskID" = ($1) returning *',
      [taskID, status],
      callback
    );
  }

  getProjectTask(projectID, callback) {
    db.query(
      'select task.description, users."userName", "usersTask"."startDate" ,"usersTask"."endDate", "usersTask"."revisionDate", "usersTask".duration from "userStory", "productBacklogItem", task, users, "usersTask" where "productBacklogItem"."projectID" = ($1) and "userStory"."PBItemID" = "productBacklogItem"."PBItemID" and "userStory"."userStoryID" = task."userStoryID" and task."taskID" = "usersTask"."taskID" and "usersTask"."userID" = users."userID"',
      [projectID],
      callback
    );
  }

  getTotalTask(projectID, callback) {
    db.query(
      'select count("taskID") from task where task."userStoryID" in (select "userStoryID" from "userStory" where "sprintID" in (select "sprintID" from sprint, project where project."projectID" = ($1) and project."projectID" = sprint."projectID"))',
      [projectID],
      callback
    );
  }

  getUserTasks(picID, sprintID, callback) {
    db.query(
      'select task."taskID", task.description, task.status, task."dueDate" from task where task."picID" = ($1) and task."userStoryID" in (select "userStoryID" from "userStory" inner join sprint on sprint."sprintID" = ($2) and "userStory"."sprintID" = sprint."sprintID")',
      [picID, sprintID],
      callback
    );
  }
}

module.exports = new TaskModel();
