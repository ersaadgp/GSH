const db = require('../config');

class UsersTaskModel {
  getSprintUsersTask(sprintID, userID, callback) {
    db.query(
      'select task."taskID", task.description, task.status, task."dueDate" from task, "usersTask" where "usersTask"."userID" = ($2) and task."taskID" = "usersTask"."taskID" and task."userStoryID" in (select "userStoryID" from "userStory" where "sprintID" = ($1))',
      [sprintID, userID],
      callback
    );
  }

  getUsersTask(taskID, userID, callback) {
    db.query(
      'select task.*, "usersTask"."userID", "usersTask"."startDate", "usersTask"."revisionDate", "usersTask"."endDate", "usersTask".duration from "usersTask", task where task."taskID" = "usersTask"."taskID" and "usersTask"."taskID" = ($1) and "usersTask"."userID" = ($2)',
      [taskID, userID],
      callback
    );
  }

  updateStartDateUsersTask(taskID, userID, callback) {
    db.query(
      'update "usersTask" set "startDate" = now() where "taskID" = ($1) and "userID" = ($2)',
      [taskID, userID],
      callback
    );
  }

  updateRevisionDateUsersTask(taskID, userID, callback) {
    db.query(
      'update "usersTask" set "revisionDate" = now() where "taskID" = ($1) and "userID" = ($2)',
      [taskID, userID],
      callback
    );
  }

  updateEndDateUsersTask(taskID, userID, duration, callback) {
    db.query(
      'update "usersTask" set "endDate" = now() , duration = ($3) where "taskID" = ($1) and "userID" = ($2)',
      [taskID, userID, duration],
      callback
    );
  }

  insertPIC(taskID, userID, callback) {
    db.query(
      'insert into "usersTask" ("taskID", "userID") values (($1), ($2))',
      [taskID, userID],
      callback
    );
  }
}

module.exports = new UsersTaskModel();
