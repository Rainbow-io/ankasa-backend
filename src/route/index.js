const express = require('express')
const route = express.Router()
const controller = require('../controller/index')
const model = require('../controller/index')
const { verifyToken } = require('../helper/auth')



route.get('/test')



module.exports = route
