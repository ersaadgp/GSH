require('dotenv').config();

const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthManager {
  changePassword(request, response) {
    const { email, password } = request.body;
    UserModel.changePassword(email, password, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }
      const { userID, userName, email, userType } = result[0];
      response.status(200).json({ userID, userName, email, userType });
    });
  }

  logIn(request, response) {
    const { identifier, password } = request.body;

    if (!identifier)
      return response.status(452).json({
        title: 'Login failed',
        message:
          'Username/email is required. Please enter your username/email.',
      });

    UserModel.getUserByUsernameOrEmail(identifier, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      if (result.length < 1) {
        return response.status(452).json({
          title: 'Login failed',
          message:
            'Your email/username and/or password do not match. Please try again.',
        });
      } else {
        const dataPassword = result[0].password;
        const { userID, userName, email, userType } = result[0];
        bcrypt.compare(
          password,
          dataPassword,
          (compareError, compareResult) => {
            if (compareResult) {
              const token = jwt.sign({ userID, userType }, process.env.JWT_KEY);
              response
                .status(200)
                .json({ userID, userName, email, userType, token });
            } else {
              return response.status(404).json({
                title: 'Login failed',
                message:
                  'Your email/username and/or password do not match. Please try again.',
              });
            }
          }
        );
      }
    });
  }

  register(request, response) {
    const { userName, email, password } = request.body;
    if (!userName || !email)
      return response.status(452).json({
        title: 'Register failed',
        message:
          'Username/email is required. Please enter your username/email.',
      });

    if (!password)
      return response.status(452).json({
        title: 'Register failed',
        message: 'Password is required. Please enter your password.',
      });

    UserModel.getUserByUsernameOrEmail(email, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      if (result.length > 0) {
        return response.status(453).json({
          title: 'Register failed',
          message: 'Your email already use by another user.',
        });
      }

      UserModel.getUserByUsernameOrEmail(userName, (error, result) => {
        if (Object.keys(error).length !== 0) {
          return response.status(500).json(error);
        }

        if (result.length > 0) {
          return response.status(453).json({
            title: 'Register failed',
            message: 'Your username already use by another user.',
          });
        }

        bcrypt.hash(password, 10, (err, hash) => {
          if (hash) {
            const hashedPassword = hash;
            UserModel.addUser(
              userName,
              email,
              hashedPassword,
              (error, result) => {
                if (Object.keys(error).length !== 0) {
                  return response.status(500).json(error);
                }

                const { userID, userName, email, userType } = result[0];
                return response
                  .status(200)
                  .json({ userID, userName, email, userType });
              }
            );
          } else {
            response.status(503).json({
              error: err,
            });
          }
        });
      });
    });
  }
}

module.exports = new AuthManager();
