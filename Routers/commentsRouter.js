const commentsRouter = require('express').Router()
const {patchCommentById} = require('../Controllers/commentsController')
const {handle405s} = require('../Error-Handlers')

commentsRouter.route('/:comment_id')
.patch(patchCommentById)
.all(handle405s)


module.exports = commentsRouter