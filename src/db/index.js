const knex = require("knex");
const config = require("../shared/config");
var pg = require("pg");
// const db = knex({
//   client: "postgres",
//   connection: {
//     host: config.db_host,
//     user: config.db_user,
//     password: config.db_password,
//     database: config.db_name,
//     port: config.db_port,
//   },
//   pool: {
//     min: 2,
//     max: 10,
//   },
// });
/**
 * @type {knex.Knex}
 */

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "7701",
    database: "exem_8",
  },
});

// const db = knex({
//   client: "postgresql",
//   connection: {
//     database: config.db_name,
//     user: config.db_user,
//     password: config.db_password,
//     port: config.db_port,
//   },
//   pool: {
//     min: 2,
//     max: 10,
//   },
// });
const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "exem_8",
  password: "7701",
  port: 5432,
});
client.connect(function (err) {
  if (err) console.log(err);
  else console.log("Connected!");
});

module.exports = { db, client };
