const express = require('express')
const controller = require('../controller/index')
const model = require('../controller/index')
const { verifyToken } = require('../helper/auth')
const route = express.Router()



// AUTH
route.post('/register', controller.register)
route.post('/login', controller.login)

// user
route.get('/profile', verifyToken, controller.allProfile)
route.get('/profile/:id', verifyToken , controller.profile)
route.put('/profile/:id/form', verifyToken, controller.changeProfile)


// FLIGHT
route.post('/list-flight', controller.listFlight)


module.exports = route
