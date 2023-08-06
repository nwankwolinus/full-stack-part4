const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
   logger.info(request.body)
   
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  if (request.body.password.length < 3) {
    response.status(400).json('password is less than 3 character')
  }

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
  })

module.exports = usersRouter