const articlesRouter = require('express').Router()
const {getArticlesById} = require('../Controllers/articlesControllers')


articlesRouter.get('/:article_id', getArticlesById)

module.exports = articlesRouter