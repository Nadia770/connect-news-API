const express =  require ('express')
const app = express()
const apiRouter = require('./Routers/apiRouter.js')
const {handle400s} = require('./Error-Handlers')


app.use(handle400s)
app.use('/api', apiRouter);



module.exports = app