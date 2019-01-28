
exports.up = function(knex, Promise) {
    return knex.schema.table("products", (table)=>{
        table.string('expectation',1000).notNullable().defaultTo('free to offer');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table("products", (table)=>{
        table.dropColumn('expectation')
    })
};
