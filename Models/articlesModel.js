const dbConnection = require('../db/dbConnection')

exports.fetchArticles = (article_id)=>{
    return dbConnection.select('*')
    .from('articles')
    .count({ total_count: 'film_id' })
    .leftjoin('comments', 'comments.article_id', '=', 'articles.article_id')
    .where('article_id', article_id)
    .then((article)=>{
        console.log(article)
    })
}