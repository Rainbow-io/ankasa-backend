const model = require('../models/index')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const standartRespons = require('../helper/common')
const jwt = require('jsonwebtoken')
const cities = require('all-the-cities');
const haversine = require('haversine-distance')
const { insert } = require('./booking')



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
            fullname: fullname,
            username: fullname + idUser,
            photo: 'https://pbs.twimg.com/profile_images/1176237957851881472/CHOXLj9b_400x400.jpg',
            email,
            password: hashpassword
        }
        if (data.username === '' || data.email === '' || password === '') {
            return next(createError(401, 'please fill all field'))
        } else if (includemail.includes(email)) {
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
            id: login[0].idusers,
            fullname: login[0].fullname,
            username: login[0].username,
            email: login[0].email,
            photo : login[0].photo,
            phone: login[0].phone,
            address: login[0].address,
            city: login[0].city,
            postcode: login[0].postcode
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


const listFlight = async (req, res, next) => {
    try {
        const { departure, arrival, classs } = req.body
        const departureDetail = cities.filter(city => {
            return city.name.match(departure) && city.country.match('ID')
        })
        const arrivalDetail = cities.filter(city => {
            return city.name.match(arrival) && city.country.match('ID')
        })
        let distance = haversine(departureDetail[0].loc.coordinates, arrivalDetail[0].loc.coordinates) / 1000
        const planes = await model.readAllairline()
        const duration = (durasi) => {
            let hours = (durasi / 60);
            let rhours = Math.floor(hours);
            let minutes = (hours - rhours) * 60;
            let rminutes = Math.round(minutes);
            return `${rhours} hours ${rminutes} minutes`
        }
        const aaa = Math.floor(Math.random() * 1200) + 82
        let dt
        const departureTime = (durasi) => {
            let hours = (durasi / 60);
            let rhours = Math.floor(hours);
            let minutes = (hours - rhours) * 60;
            let rminutes = Math.round(minutes);
            dt = `${rhours} : ${rminutes}`
            if (rhours >= 0 && rhours <= 6) {
                return 'early'
            } else if (rhours >= 7 && rhours <= 12) {
                return 'mid-early'
            } else if (rhours >= 13 && rhours <= 18) {
                return 'mid-late'
            } else if (rhours >= 19 && rhours <= 24) {
                return 'late'
            } else if (rhours > 24) {
                return 'late'
            }
            return 'wow'
        }
        let at
        const arrivalTime = (durasi, lama) => {
            const gap = durasi + lama
            let hours = (gap / 60);
            let rhours = Math.floor(hours);
            let minutes = (hours - rhours) * 60;
            let rminutes = Math.round(minutes);
            if (rhours > 24) {
                rhours = rhours - 24
            }
            at = `${rhours} : ${rminutes}`
            if (rhours >= 0 && rhours <= 6) {
                return 'early'
            } else if (rhours >= 7 && rhours <= 12) {
                return 'mid-early'
            } else if (rhours >= 13 && rhours <= 18) {
                return 'mid-late'
            } else if (rhours >= 19 && rhours <= 24) {
                return 'late'
            } else if (rhours > 24) {
                return 'late'
            }
            return 'wiw'
        }

        const classList = ['bussines', 'economy', 'first class']
        let time = [1445, 70]
        console.log(duration(770))
        let dataPlane = []
        const spin = Math.floor(Math.random() * 6) + 1
        for (let index = 0; index < 6; index++) {
            let h = Math.floor(Math.random() * 1200) + 82
            const spin2 = Math.floor(Math.random() * planes.length)
            const spin3 = Math.floor(Math.random() * classList.length)
            const classes = classList[spin3]
            let data = {
                id: Math.floor(Math.random() * 999) + 1,
                departure: departureDetail[0].name,
                arrival: arrivalDetail[0].name,
                airline: planes[spin2].name,
                logo: planes[spin2].photo,
                duration: duration((distance / (planes[spin2].speed)).toFixed(2)),
                price: (Math.round(distance) * planes[spin2].price).toFixed(1),
                facilities: 'meal, luggage, wifi',
                depature_type: departureTime(h),
                arrival_type: arrivalTime(h, (distance / (planes[0].speed))),
                depature_time: dt,
                arrival_time: at,
                transit: '1 transit',
                class: classes
            }
            dataPlane.push(data)
        }
        if (classs) {
            let planeClass = dataPlane.filter(city => city.class.match(classs))
            return standartRespons.respons(res, planeClass, 200, `6 airline available at this time`)
        }

        // console.log(departureDetail)
        standartRespons.respons(res, dataPlane, 200, `6 airline available at this time`)

    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const profile = async (req, res, next) => {
    try {
        const idUser = req.params.id
        const user = await model.readUserId(idUser)
        standartRespons.respons(res, user, 200, 'api success')

    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}


const allProfile = async (req, res, next) => {
    try {
        const result = await model.readAlluser()
        standartRespons.respons(res, result, 200, 'success')

    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const changeProfile = async (req, res, next) => {
    try {
        const userid = req.params.id
        const { fullname, email, phone, address, city, postcode} = req.body
        const data = {
            fullname,
            email,
            phone,
            address,
            city,
            postcode
        }
        
        const result = await model.updateProfile(data, userid)
        standartRespons.respons(res, data, 200, 'success')

    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const changePhoto = async (req, res, next) => {
    try {
        const userid = req.params.id
        const photo = req.file.filename
        const data = {
            photo : `https://ankasa-rainbow.herokuapp.com/file/${photo}`
        }
        
        const result = await model.updateProfile(data, userid)
        standartRespons.respons(res, data.photo, 200, 'success update photo')

    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const changePhotoLink = async (req, res, next) => {
    try {
        const userid = req.params.id
        const {photo} = req.body
        const data = {
            photo 
        }
        
        const result = await model.updateProfile(data, userid)
        standartRespons.respons(res, data.photo, 200, 'success update photo')

    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const bookingTest = async (req, res, next) => {
    try {
        const { id, departure, arrival, airline, logo, duration, price, facilities, departure_type, arrival_type, departure_time, arrival_time, transit, classname, date, qty } = req.body
        const data = {
            id , departure, arrival, airline, logo, duration, price, facilities, departure_type, arrival_type, departure_time, arrival_time, transit, classname, date, qty
        }
        const process = await model.bookingPost(data)
        standartRespons.respons(res, data, 200, 'api success')

    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const bookingDetail = async (req, res, next) => {
    try {
        const idUser = req.params.id
        const process = await model.readBooking(idUser)
        standartRespons.respons(res, process, 200, 'api success')

    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const bookingTestList = async (req, res, next) => {
    try {
        const { id, idusers, list_passenger, departure, arrival, date, arrive_time, departure_time, airline, logo, price } = req.body

        const data = {
            id , idusers, list_passenger, departure, arrival, date, arrive_time, departure_time, airline, logo, price, status : 'waiting for payment'
        }
        const process = await model.bookingPost2(data)
        standartRespons.respons(res, data, 200, 'api success')

    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const bookingDetailList = async (req, res, next) => {
    try {
        const idUser = req.params.id
        const process = await model.readAllBookingList(idUser)
        standartRespons.respons(res, process, 200, 'api success')

    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}


const bookingPay = async (req, res, next) => {
    try {
        const idUser = req.params.id
        const process = await model.putBooking(idUser)
        standartRespons.respons(res, process, 200, 'api success')

    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const bookingSuccess = async (req, res, next) => {
    try {
        const idUser = req.params.id
        const process = await model.successBooking(idUser)
        standartRespons.respons(res, process, 200, 'api success')

    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

module.exports = {
    testController,
    register,
    login,
    listFlight,
    profile,
    allProfile,
    changeProfile,
    changePhoto,
    changePhotoLink,
    bookingTest,
    bookingTestList,
    bookingDetail,
    bookingDetailList,
    bookingPay,
    bookingSuccess
}
