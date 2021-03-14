const commentsRouter = require('express').Router()
const {patchCommentById, deleteByCommentId} = require('../Controllers/commentsController')
const {handle405s} = require('../Error-Handlers')

commentsRouter.route('/:comment_id')
.patch(patchCommentById)
.delete(deleteByCommentId)
.all(handle405s)


module.exports = commentsRouter