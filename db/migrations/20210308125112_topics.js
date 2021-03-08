exports.up = function (knex) {
  console.log('table created');
  return knex.schema.createTable('topics', (topicsTable) => {
    topicsTable.string('slug').primary();
    topicsTable.string('description').notNullable();
  });
};

exports.down = function (knex) {
  console.log('table dropped');
  return knex.schema.dropTable('topics');
};
