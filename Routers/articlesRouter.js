const articlesRouter = require('express').Router()
const {getArticles} = require('../Controllers/articlesControllers')


articlesRouter.get('/:article_id', getArticles)

module.exports = articlesRouter