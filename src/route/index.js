const express = require('express')
const controller = require('../controller/index')
const model = require('../controller/index')
const { verifyToken } = require('../helper/auth')
const route = express.Router()



// route.get('/test')
route.post('/register', controller.register)
route.post('/login', controller.login)



module.exports = route
