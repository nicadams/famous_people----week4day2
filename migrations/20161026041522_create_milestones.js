
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones', function(table){
      table.increments('id').primary();
      table.string('description').notNullable();
      table.date('date_achieved').notNullable();
      table.integer('famous_people_id').unsigned();
      table.foreign('famous_people_id').references('famous_people.id');
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
    knex.schema.dropTable('milestones')
  ])
};