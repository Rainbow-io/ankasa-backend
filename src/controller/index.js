const model = require('../models/index')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const standartRespons = require('../helper/common')
const jwt = require('jsonwebtoken')
const cities = require('all-the-cities');
const haversine = require('haversine-distance')



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


const listFlight = async (req, res, next) => {
    try {
        const { departure, arrival } = req.body
        const departureDetail = cities.filter(city => {
            return city.name.match(departure) && city.country.match('ID')
        })
        const arrivalDetail = cities.filter(city => {
            return city.name.match(arrival) && city.country.match('ID')
        })
        let distance = haversine(departureDetail[0].loc.coordinates, arrivalDetail[0].loc.coordinates) / 1000
        const planes = await model.readAllairline()
        console.log(planes)
        // const planes = [
        //     { id: 1, name: "garuda air", speed: 9, price: 0.06 },
        //     { id: 2, name: "lion air", speed: 9.5, price: 0.07 },
        //     { id: 3, name: "air air lah", speed: 8.5, price: 0.08 }
        // ]
        console.log(planes)
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
            at = `${rhours} : ${rminutes}`
            if (rhours >= 0 && rhours <= 6) {
                return 'early'
            } else if (rhours >= 7 && rhours <= 12) {
                return 'mid-early'
            } else if (rhours >= 13 && rhours <= 18) {
                return 'mid-late'
            } else if (rhours >= 19 && rhours <= 24) {
                return 'late'
            }
            return 'wiw'
        }
        let time = [1445, 70]
        console.log(duration(770))
        let dataPlane = []
        const spin = Math.floor(Math.random() * 6) + 1
        for (let index = 0; index < 6; index++) {
            let h = Math.floor(Math.random() * 1200) + 82
            const spin2 = Math.floor(Math.random() * planes.length)

            let data = {
                airline: planes[spin2].name,
                duration: duration((distance / (planes[spin2].speed)).toFixed(2)),
                price: (Math.round(distance) * planes[spin2].price).toFixed(1),
                facilities: 'meal, luggage, wifi',
                depature_type: departureTime(h),
                arrival_type: arrivalTime(h, (distance / (planes[0].speed))),
                depature_time: dt,
                arrival_time: at,
            }
            dataPlane.push(data)
        }

        console.log(departureDetail)
        standartRespons.respons(res, {
            destination: { departure: departureDetail[0].name, arrival: arrivalDetail[0].name },
            listPlane: dataPlane
        }, 200, 'api success')

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
    listFlight
}
