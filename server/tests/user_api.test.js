const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const { test, expect, beforeEach } = require('@jest/globals')

// npm test -- tests/user_api.test.js

beforeEach(async () =>{
    await User.deleteMany({})
})

test('a user can be added', async () =>{
    
    const usersAtStart = await User.find({})
    const newUser = {
        username:'test_user',
        password:"123456"
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(201)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd.length).toBe(usersAtStart.length+1)
})

test('adding user without username fail with code 400', async () =>{
    
    const usersAtStart = await User.find({})
    const newUser = {
        username:'',
        password:"123456"
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd.length).toBe(usersAtStart.length)
})

test('adding user without password fail with code 400', async () =>{
    
    const usersAtStart = await User.find({})
    const newUser = {
        username:'test_user',
        password:""
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd.length).toBe(usersAtStart.length)
})

test('adding user invalid fail with code 400', async () =>{
    
    const usersAtStart = await User.find({})
    const newUser = {
        username:'test_user',
        password:"123"
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    // .expect(response.error.message).toBe('User validation failed')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd.length).toBe(usersAtStart.length)
})

afterAll(() => {
    mongoose.connection.close()
  })