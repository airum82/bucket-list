
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('list_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('list_items').insert([
        { title: 'deep south road trip', description: 'Take a road trip through the deep south'},
        { title: 'kendo', description: 'Learn how to fight with a katana'}
      ]);
    });
};
