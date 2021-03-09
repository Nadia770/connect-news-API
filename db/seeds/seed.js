const {
  topicsData,
  articlesData,
  commentsData,
  usersData
} = require('../data/index');

const {
  convertToUTC,
  createRef,
  formatItems
} = require('../utils/data-manipulation');

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex.insert(usersData).into('users');
    })
    .then(() => {
      return knex.insert(topicsData).into('topics');
    })
    .then(() => {
      const formattedArticles = convertToUTC(articlesData);
      return knex.insert(formattedArticles).into('articles').returning('*');
    })
    .then((insertedArticles) => {
      const formattedTScomments = convertToUTC(commentsData);
      const refObj = createRef(insertedArticles, 'title', 'article_id');
      const formattedComments = formatItems(
        formattedTScomments,
        refObj,
        'belongs_to',
        'article_id',
        'created_by',
        'author'
      );

      return knex.insert(formattedComments).into('comments').returning('*');
    });
};
