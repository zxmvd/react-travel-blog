const logger = require('./logger')
const { response } = require('express')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpointt = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    
    request.token = authorization.substring(7)
  }
  
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error('there is an error', error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token***' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpointt,
  errorHandler,
  tokenExtractor
}