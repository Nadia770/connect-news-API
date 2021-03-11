const {fetchArticlesById, updateArticleById, sendCommentByArticleId} = require('../Models/articlesModel')


exports.getArticlesById = (req, res, next)=>{
   const {article_id} = req.params
   fetchArticlesById(article_id).then((articles)=>{
      res.status(200).send({articles})
   })
   .catch((err)=>{
     next(err)
   })
};


exports.patchArticleById = (req, res, next)=>{
   const {article_id} = req.params
   const {inc_votes} = req.body
   updateArticleById(article_id, inc_votes).then((updatedArticle)=>{
      res.status(200).send({articles:updatedArticle})
   })
   .catch((err)=>{
      next(err)
   })
}

exports.postCommentByArticleId =(req, res, next)=>{
   const {article_id} = req.params
   const comment = req.body
   sendCommentByArticleId(comment, article_id).then((newComment)=>{
      res.status(201).send({articles:newComment})
   })
   .catch((err)=>{
     next(err)
   })
}