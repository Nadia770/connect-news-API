const usersRouter = require('express').Router()
const {getUsers, getUsersByUsername} = require('../Controllers/usersController')
const {handle405s} = require('../Error-Handlers')

usersRouter.route('/:username').get(getUsersByUsername).all(handle405s)


module.exports = usersRouter