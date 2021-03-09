const topicsRouter = require('express').Router()
const {getTopics} = require('../Controllers/topicsController')



topicsRouter.route('/').get(getTopics)


module.exports = topicsRouter