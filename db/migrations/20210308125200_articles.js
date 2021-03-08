exports.up = function (knex) {
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title').notNullable();
    articlesTable.text('body').notNullable();
    articlesTable.integer('votes').notNullable().defaultTo(0);
    articlesTable.string('topic').references('topics.slug');
    articlesTable.string('author').references('users.username');
    articlesTable.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('articles');
};

// - `article_id` which is the primary key
// - `title`
// - `body`
// - `votes` defaults to 0
// - `topic` field which references the slug in the topics table
// - `author` field that references a user's primary key (username)
// - `created_at` defaults to the current timestamp
