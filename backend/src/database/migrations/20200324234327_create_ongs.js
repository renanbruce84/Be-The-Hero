// Cria a table
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();    
  })
};

// Se algo der errado, geralmente usado para deletar a table criada
exports.down = function(knex) {
  knex.schema.droptTable('ongs')
};
