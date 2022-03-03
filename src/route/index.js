const express = require('express')
const controller = require('../controller/index')
const model = require('../controller/index')
const { verifyToken } = require('../helper/auth')
const route = express.Router()



// AUTH
route.post('/register', controller.register)
route.post('/login', controller.login)


// FLIGHT
route.get('/list-flight', controller.listFlight)


module.exports = route
