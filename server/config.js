require('dotenv').config();
const { Pool } = require('pg');

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const ssl = process.env.NODE_ENV == 'production';

class Database {
  constructor() {
    this._pool = new Pool({
      connectionString,
      ssl,
    });

    this._pool.on('error', (err, client) => {
      process.exit(-1);
    });
  }

  query(query, ...args) {
    const params = args.length == 2 ? args[0] : [];
    const callback = args.length == 1 ? args[0] : args[1];
    this._pool.query(query, params, (error, results) => {
      if (error) {
        return callback({ error: 'Database error.' }, null);
      } else {
        return callback({}, results.rows);
      }
    });
  }

  end() {
    this._pool.end();
  }
}

module.exports = new Database();
