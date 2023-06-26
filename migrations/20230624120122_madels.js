/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("madels", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table
      .integer("image_id")
      .references("id")
      .inTable("pictures")
      .onDelete("SET NULL");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("madels");
};
