const db = require('../config');

class ProjectModel {
  createNewProject(projectName, projectEstEndDate, callback) {
    db.query(
      `INSERT INTO project ("projectName", "projectStartDate", "projectEstEndDate") values (($1), now(), ($2)) RETURNING *`,
      [projectName, projectEstEndDate],
      callback
    );
  }

  endProject(projectID, callback) {
    db.query(
      'UPDATE project SET "projectEndDate" = now() WHERE "projectID" = ($1) RETURNING "projectID"',
      [projectID],
      callback
    );
  }

  getProjectById(projectID, callback) {
    db.query(
      'select * from project where "projectID" = ($1)',
      [projectID],
      callback
    );
  }

  getActiveProject(callback) {
    db.query('SELECT * FROM project WHERE "projectEndDate" is null', callback);
  }

  getAllFinishedProject(callback) {
    db.query(
      'SELECT * from project WHERE "projectEndDate" IS NOT NULL',
      callback
    );
  }

  getAvailableProjectName(projectName, callback) {
    db.query(
      'SELECT EXISTS(SELECT 1 FROM project WHERE "projectName" = ($1))',
      [projectName],
      callback
    );
  }

  getTotalManHour(projectID, callback) {
    db.query(
      'select sum("totalManHours") from "projectTeam" where "projectID" = ($1)',
      [projectID],
      callback
    );
  }

  getWorkingProject(userID, callback) {
    db.query(
      'SELECT project."projectID", "projectName", "projectStartDate", "projectEndDate", "projectEstEndDate" FROM project INNER JOIN "projectTeam" ON "projectTeam"."userID" = ($1) AND "projectTeam"."projectID" = project."projectID" AND "project"."projectEndDate" IS NULL',
      [userID],
      callback
    );
  }
}

module.exports = new ProjectModel();
