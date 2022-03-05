const express = require('express')
const controller = require('../controller/index')
const model = require('../controller/index')
const { verifyToken } = require('../helper/auth')
const { error } = require('../helper/common')
const route = express.Router()



// AUTH
route.post('/register', controller.register)
route.post('/login', controller.login)

// user
route.get('/profile', verifyToken, controller.allProfile)
route.get('/profile/:id', verifyToken , controller.profile)
route.put('/profile/:id/form', verifyToken, controller.changeProfile)
route.put('/profile/:id/picture', verifyToken, error, controller.changePhoto) //change profile



// FLIGHT
route.post('/list-flight', controller.listFlight)


module.exports = route
