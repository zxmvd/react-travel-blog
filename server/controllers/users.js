const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

usersRouter.get('/', async (request, response, next)=> {
    const users = await User.find({}).populate('blogs', {title: 1, user:1, likes:1})
    response.json(users)

})

usersRouter.post('/', async(request, response)=>{
    const body = request.body

    const saltRounds = 10
    if (body.password.length<4){
        return response.status(400).json({'error': 'password must > 3'})
    }


    const passwordHash = await bcrypt.hash( body.password, saltRounds)

    const user = new User ({
        username: body.username,
        name: body.name,
		is_male: body.is_male,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter

