
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        // PK - PRIMARY KEY
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('value').notNullable();        

        // FK - FOREIGN KEY
        table.string('ong_id').notNullable();
        // REFERENCIANDO A FK -> a COLUNA ong_id referencia a COLUNA id da TABELA ongs
        table.foreign('ong_id').references('id').inTable('ongs');
    })
};

exports.down = function(knex) {
    knex.schema.droptTable('incidents');
};
