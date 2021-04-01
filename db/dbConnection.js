const knex = require("knex");
const ENV = process.env.NODE_ENV || "development";

const dbConnection =
  ENV === "production"
    ? {
        client: "pg",
        connection: {
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }
    : require("../knexfile");

module.exports = knex(dbConnection);
