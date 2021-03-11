const articlesRouter = require('express').Router()
const {getArticlesById, patchArticleById, postCommentByArticleId} = require('../Controllers/articlesControllers')
const{handle405s} = require('../Error-Handlers')

articlesRouter.route('/:article_id')
.get(getArticlesById)
.patch(patchArticleById)
.all(handle405s)

articlesRouter.route('/:article_id/comments')
.post(postCommentByArticleId)
.all(handle405s)



module.exports = articlesRouter