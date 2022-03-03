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
            idusers: idUser,
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

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const login = await model.readUser(email)
        if (login == 0) {
            return next(createError(401, 'user not found'))
        }
        const hashPass = login[0].password
        const passHash = await bcrypt.compare(password, hashPass)
        const secretKey = process.env.SECRET_KEY_JWT
        const payload = {
            id: login[0].id,
            username: login[0].username,
            email: login[0].email
        }
        const verifyOption = {
            expiresIn: '1 day'
        }
        const token = jwt.sign(payload, secretKey, verifyOption)
        const data = {
            token: token,
            photo: login[0].photo
        }
        if (!passHash) {
            return next(createError(401, 'wrong password'))
        }
        standartRespons.respons(res, data, 200, `hello ${login[0].username}`)
    }
    catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}


module.exports = {
    testController,
    register,
    login
}
