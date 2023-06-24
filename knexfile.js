// Update with your config settings.
const env = require("dotenv");
const config = require("./src/shared/config");
env.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      filename: "./dev.postgresql",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: config.db_name,
      user: config.db_user,
      password: config.db_password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: config.db_name,
      user: config.db_user,
      password: config.db_password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
