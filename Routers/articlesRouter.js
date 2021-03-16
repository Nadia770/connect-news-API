const articlesRouter = require('express').Router()
const {getArticleById, patchArticleById, postCommentByArticleId, getCommentByArticleId, getAllArticles} = require('../Controllers/articlesControllers')
const{handle405s} = require('../Error-Handlers')

articlesRouter.route('/')
.get(getAllArticles)
.all(handle405s)

articlesRouter.route('/:article_id')
.get(getArticleById)
.patch(patchArticleById)
.all(handle405s)

articlesRouter.route('/:article_id/comments')
.post(postCommentByArticleId)
.get(getCommentByArticleId)
.all(handle405s)



module.exports = articlesRouter