const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "docker",
    password: "docker",
    database: "db-api",
  },
  migrations: {
    directory: "./migrations",
  },
});

module.exports = { db };
