/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("brands").del();
  await knex("brands").insert([
    { brand_name: "hp" },
    { brand_name: "asus" },
    { brand_name: "dell" },
  ]);
};
