const db = require('../config');

class UserModel {
  getUserIDByEmails(emails, callback) {
    let query = ['select u."userID" from users u join (VALUES '];
    let queryIndex = [];
    let queryValues = [];

    emails.forEach((email, index) => {
      queryIndex.push(`(($${index + 1}), ${index})`);
      queryValues.push(email);
    });
    query.push(queryIndex.join(', '));
    query.push(
      ') AS x (email, ordering) ON u."email" = x.email ORDER BY x.ordering'
    );

    db.query(query.join(' '), queryValues, callback);
  }

  getUserByID(userID, callback) {
    db.query(
      'SELECT "userID", "userName", "email", "userType" FROM users WHERE "userID"=($1)',
      [userID],
      callback
    );
  }

  getUserByUsernameOrEmail(identifier, callback) {
    db.query(
      'SELECT * FROM users WHERE users.email = ($1) OR users."userName" = ($1)',
      [identifier],
      callback
    );
  }

  changeUserPassword(email, newPassword, callback) {
    db.query(
      'UPDATE users SET password = ($1) WHERE "email" = ($2) RETURNING *',
      [newPassword, email],
      callback
    );
  }

  addUser(userName, email, password, callback) {
    db.query(
      `insert into users ("userName", "email", "password", "userType") values (($1), ($2), ($3), 'project team') RETURNING *`,
      [userName, email, password],
      callback
    );
  }
}

module.exports = new UserModel();
