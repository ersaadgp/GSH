const db = require('../config');

class SprintRetrospectiveItemModel {
  createNewSprintRetrospectiveItem(
    userID,
    sprintID,
    messageHaveToKeep,
    messageHaveToChange,
    messageHaveToStart,
    callback
  ) {
    db.query(
      `INSERT INTO "sprintRetrospective" ("userID", "sprintID", message, category) VALUES (($1), ($2), ($3), 'Have To Keep'), (($1), ($2), ($4), 'Have To Change'), (($1), ($2), ($5), 'Have To Start')`,
      [
        userID,
        sprintID,
        messageHaveToKeep,
        messageHaveToChange,
        messageHaveToStart,
      ],
      callback
    );
  }

  getAllProjectsSprintRestrospective(projectID, callback) {
    db.query(
      'select users."userName", "sprintRetrospective"."sprintID", "sprintRetrospective".message, "sprintRetrospective".category from "sprintRetrospective", users where "sprintRetrospective"."userID" = users."userID" and "sprintID" in (select "sprintID" from sprint where "projectID" = ($1))',
      [projectID],
      callback
    );
  }

  getAllSprintRetrospectiveItem(sprintID, callback) {
    db.query(
      'select * from "sprintRetrospective" where "sprintID" = ($1)',
      [sprintID],
      callback
    );
  }
}

module.exports = new SprintRetrospectiveItemModel();
