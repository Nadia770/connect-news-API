const {
  topicsData,
  articlesData,
  commentsData,
  usersData
} = require('../data/index');

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex
        .insert(usersData)
        .into('users')
        .returning('*')
        .then((insertedUsers) => {});
    });
};
