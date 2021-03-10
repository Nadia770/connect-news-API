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
}