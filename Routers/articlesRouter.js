const articlesRouter = require('express').Router()
const {getArticlesById, postArticleById} = require('../Controllers/articlesControllers')


articlesRouter.get('/:article_id', getArticlesById)
articlesRouter.patch('/:article_id', postArticleById)

module.exports = articlesRouter