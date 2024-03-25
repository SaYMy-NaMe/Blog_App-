const pool = require("../pool");
const createTable = {
  userRole: () => {
    pool.query(`CREATE TYPE userRole AS ENUM ('USER', 'ADMIN')`, (error) => {
      if (error) {
        console.error(`Error occurred while creating ENUM table: ${error}`);
      } else {
        console.log("ENUM value created");
      }
      // Don't forget to release the client when you're done with it.
      // pool.end();
    });
  },
  users: () => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    address VARCHAR,
    role userRole NOT NULL DEFAULT 'USER',
    password VARCHAR NOT NULL, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)`,
      (error) => {
        if (error) {
          console.error(`Error occurred while creating users table: ${error}`);
        } else {
          console.log("Users table created");
        }
        // Don't forget to release the client when you're done with it.
        // pool.end();
      }
    );
  },
  categoryENUM: () => {
    pool.query(
      `CREATE TYPE categoryENUM AS ENUM ('SCIENCE', 'PSYCHOLOGY', 'SOCIAL', 'OTHER')`,
      (error) => {
        if (error) {
          console.error(
            `Error occurred while creating categoryENUM value: ${error}`
          );
        } else {
          console.log("categoryENUM value created");
        }
        // Don't forget to release the client when you're done with it.
        // pool.end();
      }
    );
  },
  posts: () => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id),
    category categoryENUM NOT NULL,
    description VARCHAR, 
    approval BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)`,
      (error) => {
        if (error) {
          console.error(`Error occurred while creating posts table: ${error}`);
        } else {
          console.log("Posts table created");
        }
        // Don't forget to release the client when you're done with it.
        // pool.end();
      }
    );
  },
  comments: () => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id),
    commenter_id INTEGER REFERENCES users(id),
    description VARCHAR,
    parentCommentId INTEGER NULL REFERENCES Comments(id), 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)`,
      (error) => {
        if (error) {
          console.error(
            `Error occurred while creating comments table: ${error}`
          );
        } else {
          console.log("Comments table created");
        }
        // Don't forget to release the client when you're done with it.
        // pool.end();
      }
    );
  },
};
module.exports = createTable;
