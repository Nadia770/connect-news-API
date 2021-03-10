const {fetchArticlesById} = require('../Models/articlesModel')


exports.getArticlesById = (req, res, next)=>{
   const {article_id} = req.params
   fetchArticlesById(article_id).then((articles)=>{
       res.status(200).send({articles})
   })
}