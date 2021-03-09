const usersRouter = require('express').Router()
const {getUsers} = require('../Controllers/usersController')


usersRouter.get('/:username', getUsers)


module.exports = usersRouter