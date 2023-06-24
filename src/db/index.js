const knex = require("knex");
const config = require("../shared/config");

const db = knex({
  client: "postgresql",
  connection: {
    database: config.db_name,
    user: config.db_user,
    password: config.db_password,
    port: config.db_port,
  },
  pool: {
    min: 2,
    max: 10,
  },
});

/**
 * @type {knex.Knex}
 */
module.exports = db;
