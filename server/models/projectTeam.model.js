const db = require('../config');

class ProjectTeamModel {
  addProjectTeam(userID, projectID, lvAccess, callback) {
    db.query(
      `INSERT INTO "projectTeam" ("userID", "projectID", "lvAccess") VALUES(($1), ($2), ($3)) RETURNING "projectID", "userID"`,
      [userID, projectID, lvAccess],
      callback
    );
  }

  deleteProjectMember(userID, projectID, callback) {
    db.query(
      'DELETE FROM "projectTeam" WHERE "userID"=($1) AND "projectID"=($2) RETURNING "projectID", "userID"',
      [userID, projectID],
      callback
    );
  }

  getAllProjectMember(projectID, callback) {
    db.query(
      'SELECT users."userID", users."email", users."userName" FROM users INNER JOIN "projectTeam" ON "projectTeam"."projectID" = ($1) AND "projectTeam"."userID" = users."userID"',
      [projectID],
      callback
    );
  }

  getProjectsDevTeam(projectID, callback) {
    db.query(
      `SELECT users."userID", users."userName", "projectTeam"."lvAccess" FROM users, "projectTeam" WHERE "projectTeam"."projectID" = ($1) AND "projectTeam"."userID" = users."userID" AND "projectTeam"."lvAccess" IN ('03','04')`,
      [projectID],
      callback
    );
  }

  getProjectLevelAccess(userID, projectID, callback) {
    db.query(
      'SELECT "lvAccess", "userID" FROM "projectTeam" WHERE "userID"=($1) AND "projectID"=($2)',
      [userID, projectID],
      callback
    );
  }

  getProjectMemberByRole(projectID, lvAccess, callback) {
    db.query(
      'SELECT "userID" FROM "projectTeam" WHERE "projectID"=($1) AND "lvAccess"=($2)',
      [projectID, lvAccess],
      callback
    );
  }

  getProjectsProductOwner(userID, callback) {
    db.query(
      `select users."userID", users."userName" , "projectTeam"."projectID" from users, "projectTeam" where "projectTeam"."userID" = users."userID" AND "projectTeam"."lvAccess" = '01' AND "projectTeam"."projectID" IN (SELECT "projectID" from "projectTeam" where "userID" = ($1))`,
      [userID],
      callback
    );
  }

  getAllProjectsProductOwner(callback) {
    db.query(
      `select users."userID", users."userName" , "projectTeam"."projectID" from users, "projectTeam" where "projectTeam"."userID" = users."userID" AND "projectTeam"."lvAccess" = '01'`,
      callback
    );
  }

  getProjectTeamProductOwner(projectID, callback) {
    db.query(
      `SELECT users."userID", users."email", users."userName" FROM users WHERE users."userID" IN (SELECT "projectTeam"."userID" FROM "projectTeam" WHERE "projectTeam"."projectID" in ($1) AND "projectTeam"."lvAccess" = '02')`,
      [projectID],
      callback
    );
  }

  getProjectsProductOwnerAndScrumMaster(projectID, callback) {
    db.query(
      `SELECT users."userID", users."userName", "projectTeam"."lvAccess" FROM users, "projectTeam" WHERE "projectTeam"."projectID" = ($1) AND "projectTeam"."userID" = users."userID" AND "projectTeam"."lvAccess" IN ('02','01') order by "projectTeam"."lvAccess"`,
      [projectID],
      callback
    );
  }

  getProjectTeamScrumMaster(projectID, callback) {
    db.query(
      `SELECT users."userID", users."email", users."userName" FROM users WHERE users."userID" IN (SELECT "projectTeam"."userID" FROM "projectTeam" WHERE "projectTeam"."projectID" IN ($1) AND "projectTeam"."lvAccess" = '03')`,
      [projectID],
      callback
    );
  }

  insertProjectTeam(projectID, users, callback) {
    let query = [
      'INSERT INTO "projectTeam" ("projectID","userID", "lvAccess" ) VALUES',
    ];
    let queryIndex = [];
    let queryValues = [];

    queryValues.push(projectID);
    users.map((value, index) => {
      if (index === 0) {
        queryIndex.push(`(($1), ($2), '01')`);
      } else if (index === 1) {
        queryIndex.push(`(($1), ($3), '02')`);
      } else if (index === 2) {
        queryIndex.push(`(($1), ($4), '03')`);
      }
      if (index > 2) {
        queryIndex.push(`(($1),($${index + 2}),'04')`);
      }
      queryValues.push(value);
    });
    query.push(queryIndex.join(', '));
    query.push('RETURNING *');

    db.query(query.join(' '), queryValues, callback);
  }

  updateProjectTeamRole(lvAccess, projectID, userID, callback) {
    db.query(
      'update "projectTeam" set "lvAccess" = ($1) where "projectID" = ($2) and "userID" = ($3) returning *',
      [lvAccess, projectID, userID],
      callback
    );
  }
}

module.exports = new ProjectTeamModel();
