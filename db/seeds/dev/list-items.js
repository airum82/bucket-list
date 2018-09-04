
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('list_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('list_items').insert([
        {id: 1, title: 'deep south road trip', description: 'Take a road trip through the deep south'},
        {id: 2, title: 'kendo', description: 'Learn how to fight with a katana'}
      ]);
    });
};
