/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("notebooks", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table
      .integer("brand_id")
      .references("id")
      .inTable("brands")
      .onDelete("SET NULL");
    table
      .integer("madels_id")
      .references("id")
      .inTable("madels")
      .onDelete("SET NULL");
    table
      .integer("category_id")
      .references("id")
      .inTable("categories")
      .onDelete("SET NULL");
    table.text("description").defaultTo(" ");
    table.integer("price").defaultTo(0);
    table
      .integer("image_id")
      .references("id")
      .inTable("pictures")
      .onDelete("SET NULL");
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("notebooks");
};
