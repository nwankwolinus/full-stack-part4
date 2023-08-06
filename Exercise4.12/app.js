const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
var morgan = require('morgan')

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'))
  

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)


module.exports = app