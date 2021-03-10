const {fetchArticles} = require('../Models/articlesModel')


exports.getArticles = (req, res, next)=>{
   const {article_id} = req.params
   fetchArticles(article_id).then((articles)=>{
       res.status(200).send({articles})
   })
}