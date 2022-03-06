const express = require('express')
const userController = require('../controllers/users')

const router = express.Router()

router
    .post('/register', userController.register)
    .post('/login', userController.login)
    .get('/verify/:token', userController.verify)
    .patch('/update/:idusers', userController.updateData)
    .get('/getDetail/:idusers', userController.getDetail)
    .get('/getAll', userController.getAll)


module.exports = router