const db = require('../config');

class SprintModel {
  initiateSprint(projectID, callback) {
    db.query(
      `INSERT INTO sprint ("sprintID","projectID","sprintNumber",status) VALUES (next_sprint_id(($1)),($1),next_sprint_number(($1)),'on queue')`,
      [projectID],
      callback
    );
  }

  endSprint(sprintID, callback) {
    db.query(
      `UPDATE sprint SET "endDate"=now(), status='Complete' WHERE "sprintID"=($1) returning "sprintID"`,
      [sprintID],
      callback
    );
  }

  startSprint(sprintGoal, dueDate, sprintID, callback) {
    db.query(
      `UPDATE sprint SET "sprintGoal" = ($1), status='running', "estEndDate" = ($2) WHERE "sprintID" = ($3) RETURNING *`,
      [sprintGoal, dueDate, sprintID],
      callback
    );
  }

  getProjectsSprint(projectID, callback) {
    db.query(
      `SELECT * FROM sprint WHERE "projectID"=($1) AND status='running'`,
      [projectID],
      callback
    );
  }

  getAllSprint(projectID, callback) {
    db.query(
      `SELECT * FROM sprint WHERE "projectID"=($1)`,
      [projectID],
      callback
    );
  }

  getReadyProjects(projectID, callback) {
    db.query(
      `SELECT * FROM sprint where "projectID" = ($1) AND status = 'on queue'`,
      [projectID],
      callback
    );
  }

  getTotalSprint(projectID, callback) {
    db.query(
      'select count("sprintID") from sprint where "projectID" = ($1)',
      [projectID],
      callback
    );
  }

  getSprint(sprintID, callback) {
    db.query(
      'SELECT * FROM sprint WHERE "sprintID"=($1)',
      [sprintID],
      callback
    );
  }
}

module.exports = new SprintModel();
