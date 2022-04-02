const express = require('express')
const { booking } = require('../controller')
const bookingController = require('../controller/index')
const router = express.Router()
const { verifyToken } = require('../helper/auth')


router
.post('/insert/', verifyToken, bookingController.bookingTest )
.post('/list', verifyToken, bookingController.bookingTestList )
.get('/list/:id', verifyToken, bookingController.bookingDetailList)
.get('/detail/:id', verifyToken, bookingController.bookingDetail)
.put('/list/pay/:id',  verifyToken, bookingController.bookingPay)
.get('/list/success/:id', verifyToken, bookingController.bookingSuccess)
.get('/list/payment/:id', verifyToken, bookingController.bookingDetailListPayment)
    // .get('/getAll', authentication, authorization, bookingController.getAllData)
    // .get('/getDetail/:idbooking', authentication, authorization, bookingController.getDetail)
    // .get('/getBookingUser/:idusers', authentication, authorization, bookingController.getBookingUser)
    // .patch('/update/:idbooking', admin, authentication, authorization, bookingController.update)
    // .delete('/delete/:idbooking', authentication, authorization, bookingController.delete)
    // .patch('/updatePayment/:idbooking', authentication, authorization, bookingController.updatePayment)

module.exports = router