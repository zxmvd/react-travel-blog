const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({username:body.username})
    const passwordCorrect = (user === null)?
    false
    :await bcrypt.compare(body.password, user.passwordHash)


    if (!(user && passwordCorrect)) {

        return response.status(400).send('user or passwor invalid')
        
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    // a decoded token will be :
    //  { username: 'dada3', id: '603489062335b328605a1711', iat: 1614056101 }
    // note that id will be decoded to string

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id:user._id.toString() })
})

module.exports = loginRouter
