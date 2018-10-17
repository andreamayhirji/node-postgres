exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('milestones', function (table) {
            table.increments();
            table.string('description').notNull();
            table.date('date_achieved').notNull();
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('milestones')
    ])
};