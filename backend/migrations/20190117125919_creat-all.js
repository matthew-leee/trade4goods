
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users_credential', table => {
            table.increments('login_id').unsigned().primary();
            table.string('username').notNullable().unique();
            table.string('password').nullable();
            table.string('email').notNullable().unique();
            table.boolean('email_isVerifying').notNullable().defaultTo(true);
            table.integer('google_id', null).nullable();
            table.integer('facebook_id', null).nullable();
            table.string('access_token').nullable();
        }),

        knex.schema.createTable('users', table => {
            table.increments('user_id').unsigned().primary();
            table.integer('login_id').unsigned().notNullable();
            table.foreign('login_id').references('login_id').inTable('users_credential');
            table.string('displayed_name').notNullable();
            table.string('ig_ac').nullable();
            table.binary('profile_picture').nullable();
            table.specificType('uploaded_products', 'INT[]').nullable();
            table.specificType('liked_products', 'INT[]').nullable();
            table.specificType('offered_products', 'INT[]').nullable();
            table.specificType('products_being_offered', 'INT[]').nullable();
            table.specificType('trade_history', 'INT[]').nullable();
            table.integer('credibility').unsigned().defaultTo(5)
            table.specificType('chat_basket', 'INT[]').nullable();
        }),

        knex.schema.createTable('product_comments', table => {
            table.increments('comment_id').unsigned().primary();
            table.integer('commentator').unsigned().notNullable();
            table.foreign('commentator').references('user_id').inTable('users');
            table.string('comment').notNullable();
            table.timestamp('comment_at').notNullable().defaultTo(knex.fn.now());
        }),

        knex.schema.createTable('products', table => {
            table.increments('product_id').unsigned().primary();
            table.string('name').notNullable();
            table.binary('image').nullable();
            table.string('description').nullable();
            table.string('trade_location').nullable();
            table.specificType('tags', 'VARCHAR[]').nullable();
            table.integer('uploaded_by').notNullable();
            table.timestamp('uploaded_at').notNullable().defaultTo(knex.fn.now());
            table.specificType('liked_by', 'INT[]').nullable();
            table.specificType('comments', 'INT[]').nullable();
            table.specificType('offered_by', 'INT[]').nullable();
            table.integer('sold_to').nullable();
            table.timestamp('sold_at').nullable().defaultTo(null);
            table.integer('status').notNullable().defaultTo(1);
        }),

        knex.schema.createTable('chats', table => {
            table.increments('chat_id').unsigned().primary();
            table.integer('user_id1').unsigned().notNullable();
            table.integer('user_id2').unsigned().notNullable()
            table.foreign('user_id1').references('user_id').inTable('users');
            table.foreign('user_id2').references('user_id').inTable('users');
            table.specificType('messages', 'INT[]').nullable();
        }),

        knex.schema.createTable('messages', table => {
            table.increments('message_id').unsigned().primary();
            table.boolean('sent_by_user1').notNullable();
            table.string('chat_message').notNullable();
            table.timestamp('sent_at').notNullable();
            table.boolean('del_by_user1').notNullable().defaultTo(false);
            table.boolean('del_by_user2').notNullable().defaultTo(false);
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('messages'),
        knex.schema.dropTable('chats'),
        knex.schema.dropTable('products'),
        knex.schema.dropTable('product_comments'),
        knex.schema.dropTable('users'),
        knex.schema.dropTable('users_credential')
    ])
};