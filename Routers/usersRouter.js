const usersRouter = require('express').Router()
const {getUsers, getUsersByUsername} = require('../Controllers/usersController')


usersRouter.get('/:username', getUsersByUsername)


module.exports = usersRouter