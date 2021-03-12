const {fetchArticlesById, updateArticleById, sendCommentByArticleId, fetchCommentByArticleId, checkIfArticleExits} = require('../Models/articlesModel')


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
};

exports.getCommentByArticleId =(req, res, next)=>{
   console.log("im in the controller")
   const {article_id} = req.params
   Promise.all([fetchCommentByArticleId(article_id), checkIfArticleExits(article_id)])
   .then(([comments])=>{
      res.status(200).send({comments})
   })
   .catch((err)=>{
     next(err)
   })
};