/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("brands", (table) => {
    table.increments("id").primary();
    table.string("brand_name").notNullable();
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
  return knex.schema.dropTable("brands");
};
