const db = require('../config');

class UserStoryModel {
  createUserStory(PBItemID, sprintID, description, callback) {
    db.query(
      'INSERT INTO "userStory" ("userStoryID", "PBItemID", "sprintID", description) VALUES (next_user_story_id(($1), ($2)), ($1), ($2), ($3)) returning *',
      [PBItemID, sprintID, description],
      callback
    );
  }

  getAllSprintUserStory(sprintID, callback) {
    db.query(
      'select * from "userStory" where "sprintID" = ($1)',
      [sprintID],
      callback
    );
  }

  getUserStory(userStoryID, callback) {
    db.query(
      'select * from "userStory" where "userStoryID" = ($1)',
      [userStoryID],
      callback
    );
  }
}

module.exports = new UserStoryModel();
