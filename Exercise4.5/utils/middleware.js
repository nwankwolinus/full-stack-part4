const logger = require('./logger')
var morgan = require('morgan')


morgan.token('payload', function (req) {
  return JSON.stringify(req.body)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
  
module.exports = {
  logger,
  unknownEndpoint,
}