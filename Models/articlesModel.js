const dbConnection = require('../db/dbConnection')

exports.fetchArticlesById = (article_id)=>{
    return dbConnection
    .select('articles.author',
            'articles.title', 
            'articles.article_id', 
            'articles.body', 
            'articles.topic', 
            'articles.created_at',
            'articles.votes')
    .count('comments.comment_id as comment_count')
    .from('articles')
    .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
    .groupBy("articles.article_id")
    .where('articles.article_id', article_id)
    .then((articles)=>{
        if(!articles.length) return Promise.reject({status: 404, msg: 'Article does not exist'})
        else return articles
    })
};


exports.updateArticleById = (article_id, inc_votes)=>{
  console.log(inc_votes)
  if(isNaN(inc_votes)) return Promise.reject({status: 400, msg: 'Bad request'})
    else {
    return dbConnection 
    .select('*').from('articles')
    .where('article_id', article_id)
    .increment('votes', inc_votes)
    .returning('*')
    .then((article)=>{
      console.log(article)
        if(!article.length) return Promise.reject({status: 404, msg: 'Article does not exist'})
        else {
        return article
        }
    })
    }
};

exports.createCommentByArticleId =(comment, article_id)=>{
  if(!comment.body || !comment.username) return Promise.reject({status: 400, msg: 'Bad request'})
  const newComment = {
    author: comment.username,
    body: comment.body,
    article_id : article_id
  }
  return dbConnection
  .from('comments')
  .insert(newComment)
  .returning("*")
};


exports.fetchCommentByArticleId = (article_id, sort_by)=>{
  console.log(sort_by)
  return dbConnection
  .select('*').from('comments')
  .where('article_id', article_id)
  .orderBy(sort_by ||'created_at', 'desc')
  .returning("*")

};


exports.checkIfArticleExits = (article_id)=>{
  return dbConnection('articles')
  .select('*')
  .where('article_id', article_id)
  .then((article)=>{
    if(!article.length){
      return Promise.reject({status: 404, msg: 'Article does not exist'})
    }
  })
};