const articlesRouter = require('express').Router()
const {getArticlesById, patchArticleById, postCommentByArticleId} = require('../Controllers/articlesControllers')
const{handle405s} = require('../Error-Handlers')


articlesRouter.get('/:article_id', getArticlesById)
articlesRouter.patch('/:article_id', patchArticleById)
articlesRouter.post('/:article_id/comments', postCommentByArticleId)
articlesRouter.delete('/:article_id/comments', handle405s)


module.exports = articlesRouter