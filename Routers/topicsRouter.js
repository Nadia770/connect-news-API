const topicsRouter = require('express').Router()
const {getTopics} = require('../Controllers/topicsController')
const {handle405s} = require('../Error-Handlers')


topicsRouter.route('/')
.get(getTopics)
.all(handle405s)



module.exports = topicsRouter