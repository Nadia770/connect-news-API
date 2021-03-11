const {fetchArticlesById, updateArticleById} = require('../Models/articlesModel')


exports.getArticlesById = (req, res, next)=>{
   const {article_id} = req.params
   fetchArticlesById(article_id).then((articles)=>{
      res.status(200).send({articles})
   })
   .catch((err)=>{
     next(err)
   })
};


exports.postArticleById = (req, res, next)=>{
   const {article_id} = req.params
   const {inc_votes} = req.body
   updateArticleById(article_id, inc_votes).then((updatedArticle)=>{
      res.status(200).send({articles:updatedArticle})
   })
   .catch((err)=>{
      next(err)
   })
}