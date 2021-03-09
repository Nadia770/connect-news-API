const topicsRouter = require('express').Router()
const {getTopics} = require('../Controllers/topicsController')



topicsRouter.get('/', getTopics)


module.exports = topicsRouter