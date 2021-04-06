const express =  require ('express');
const { handleCustomError, handle400s, handle500s } = require('./Error-Handlers/index.js');
const app = express()
const apiRouter = require('./Routers/apiRouter.js')
app.use(cors())


app.use(express.json());
app.use('/api', apiRouter);

//error Handlers
app.use(handle400s)
app.use(handleCustomError)
app.use(handle500s)



module.exports = app