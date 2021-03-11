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
    return dbConnection 
    .select('*').from('articles').where('article_id', article_id)
    .then((article)=>{
				if(isNaN(inc_votes)) return Promise.reject({status: 400, msg: 'Bad request'})
        if(!article.length) return Promise.reject({status: 404, msg: 'Article does not exist'})
        else {
        article[0].votes = inc_votes
        return article
        }
    })
};

exports.sendCommentByArticleId =(comment, article_id)=>{
  return dbConnection
  .select('*').from('articles').where('article_id', article_id)
  .then((article)=>{
    if(!article.length) return Promise.reject({status: 404, msg: 'Article does not exist'})
    else {
      article[0].body = comment.body
      article[0].author = comment.username 
      return article
    }
  })
}