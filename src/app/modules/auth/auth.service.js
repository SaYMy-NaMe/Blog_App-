const config = require("../../../config");
const pool = require("../../../pool");
const ApiError = require("../../../errors/ApiError");
var jwt = require("jsonwebtoken");

const createUserInDB = async (payload) => {
  let { name, email, address, role, password } = payload;

  if (!role) {
    role = "USER";
  }
  const query =
    "INSERT INTO users (name, email, address, role, password, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp) RETURNING id, name, email, address, role, createdAt, updatedAt";
  const values = [name, email, address, role, password];

  const createdUser = (await pool.query(query, values)).rows[0];
  return createdUser;
};

const loginUser = async (payload) => {
  const { email, password } = payload;
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  const result = await pool.query(query, values);
  const user = result.rows[0];

  if (user) {
    if (user.password === password) {
      const { id, name, email } = user;

      const accessToken = jwt.sign(
        {
          id,
          name,
          email,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expires_in }
      );

      return {
        accessToken,
      };
    } else {
      throw new ApiError(401, "Invalid password");
    }
  } else {
    throw new ApiError(404, "User does not exist");
  }
};

const authService = {
  createUserInDB,
  loginUser,
};

module.exports = authService;
