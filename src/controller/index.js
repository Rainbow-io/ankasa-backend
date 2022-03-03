const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const responsStandart = require('../helper/common')
const model = require('../models/index')

const testController = async (req, res, next) => {
    try {

        responsStandart.respons(res, null, 200, 'api success')

    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}


module.exports = {
    testController
}
