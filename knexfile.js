const config = require("./src/shared/config");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      filename: "./dev.postgresql",
      database: config.db_name,
      user: config.db_user,
      password: config.db_password,
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
