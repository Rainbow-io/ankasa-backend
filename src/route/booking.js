const express = require('express')
const { booking } = require('../controller')
const bookingController = require('../controller/index')
const router = express.Router()
const { verifyToken } = require('../helper/auth')


router
.post('/insert/', bookingController.bookingTest )
.post('/list', bookingController.bookingTestList )
.get('/list/:id', bookingController.bookingDetailList)
.get('/detail/:id', bookingController.bookingDetail)
.put('/list/pay/:id', bookingController.bookingPay)
    // .get('/getAll', authentication, authorization, bookingController.getAllData)
    // .get('/getDetail/:idbooking', authentication, authorization, bookingController.getDetail)
    // .get('/getBookingUser/:idusers', authentication, authorization, bookingController.getBookingUser)
    // .patch('/update/:idbooking', admin, authentication, authorization, bookingController.update)
    // .delete('/delete/:idbooking', authentication, authorization, bookingController.delete)
    // .patch('/updatePayment/:idbooking', authentication, authorization, bookingController.updatePayment)

module.exports = router