const model = require('../models/index')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const standartRespons = require('../helper/common')
const jwt = require('jsonwebtoken')


const testController = async (req, res, next) => {
    try {

        responsStandart.respons(res, null, 200, 'api success')

    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const register = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body
        const idUser = Math.floor(Math.random() * 999)
        const hashpassword = await bcrypt.hash(password, 10)
        const emaillist = await model.readAlluser()
        const includemail = emaillist.map(email => email.email)
        const includeusername = emaillist.map(username => username.username)
        console.log(includeusername)
        const data = {
            iduser: idUser,
            username: fullname + idUser,
            email,
            password: hashpassword
        }
        if (data.username === '' || data.email === '' || password === '') {
            return next(createError(401, 'please fill all field'))
        }else if (includemail.includes(email)) {
            return next(createError(401, 'email already registered'))
        } else {
            const register = await model.insertUsers(data)
            standartRespons.respons(res, data, 200, 'test')
        }
    }
    catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}


module.exports = {
    testController,
    register
}
