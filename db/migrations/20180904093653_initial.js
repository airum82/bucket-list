exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('list_items', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('description');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('list_items')
  ])
};
