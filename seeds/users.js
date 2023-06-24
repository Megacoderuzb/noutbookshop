const bcrypt = require("bcrypt");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      full_name: "Muhammadjon Abduvahobov",
      role: "admin",
      username: "megacoder",
      password_hash: bcrypt.hashSync("7070", 10),
    },
    {
      full_name: "John Doe",
      role: "customer",
      username: "chief_mega",
      password_hash: bcrypt.hashSync("1234", 10),
    },
  ]);
};
