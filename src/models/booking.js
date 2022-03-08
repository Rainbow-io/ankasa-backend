const { promise } = require('../config/database');
const database = require('../config/database')

const booking = {
    getAllData: () => {
        return new Promise((resolve, reject) => {
         database.query(`SELECT  databaseooking, users.idusers, email,phone, username, city, address, 
            users.image as imageusers, flight.idflight,airlines.idairlines,nameairlines,
            airlines.image as imageairlines, fromcity.idcities, 
            fromcity.namecity as fromnamecity, fromcountry.idcountries, fromcountry.namecountries as fromcountry,
            fromcountry.alias as fromalias, tocity.idcities, tocity.namecity as tonamecity, tocountry.idcountries, 
            tocountry.namecountries as tocountry,tocountry.alias as toalias,code,classflight,typeflight,
            transit,direct,date_departure,departure,arrived,price,rating,
            review, fullname, nationality, payment_status, terminal, gate, total, 
            FROM (((((((booking INNER JOIN users ON booking.idusers= users.idusers)
             INNER JOIN flight ON booking.idflight=flight.idflight) 
            INNER JOIN airlines ON flight.idairlines=airlines.idairlines) 
            INNER JOIN cities as fromcity on flight.idfromcity=fromcity.idcities) 
            INNER JOIN countries as fromcountry ON fromcity.idcities=fromcountry.idcountries)
            INNER JOIN cities as tocity on flight.idtocity=tocity.idcities) 
            INNER JOIN countries as tocountry on tocity.idcities=tocountry.idcountries)`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getDetail: (id) => {
        return new Promise((resolve, reject) => {
         database.query(`SELECT  databaseooking, users.idusers, email,phone, username, city, address,users.image as imageusers,
            flight.idflight,airlines.idairlines,nameairlines,
            airlines.image as imageairlines, fromcity.idcities, 
            fromcity.namecity as fromnamecity, fromcountry.idcountries, fromcountry.namecountries as fromcountry,
            fromcountry.alias as fromalias, 
            tocity.idcities, tocity.namecity as tonamecity, tocountry.idcountries, 
            tocountry.namecountries as tocountry,tocountry.alias as toalias,code,classflight,typeflight,
            transit,direct,DATE_FORMAT(date_departure, "%W, %e %M %Y") as date_departure, 
            TIME_FORMAT(departure, "%h:%i %p") as departure,arrived,price,rating,review,fullname, nationality,
            payment_status, terminal, gate, total, booking.image,
            FROM (((((((booking INNER JOIN users ON booking.idusers= users.idusers) 
            INNER JOIN flight ON booking.idflight=flight.idflight) 
            INNER JOIN airlines ON flight.idairlines=airlines.idairlines) 
            INNER JOIN cities as fromcity on flight.idfromcity=fromcity.idcities) 
            INNER JOIN countries as fromcountry ON fromcity.idcities=fromcountry.idcountries)
            INNER JOIN cities as tocity on flight.idtocity=tocity.idcities) 
            INNER JOIN countries as tocountry on tocity.idcities=tocountry.idcountries)
            WHERE booking. databaseooking=${id}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getBookingUser: (idusers) => {
        return new Promise((resolve, reject) => {
         database.query(`SELECT  databaseooking, users.idusers, email,phone, username, city, address, users.image as imageusers,
            flight.idflight,airlines.idairlines,nameairlines,
            airlines.image as imageairlines, fromcity.idcities, 
            fromcity.namecity as fromnamecity, fromcountry.idcountries, fromcountry.namecountries as fromcountry,
            fromcountry.alias as fromalias,tocity.idcities, tocity.namecity as tonamecity, tocountry.idcountries, 
            tocountry.namecountries as tocountry,tocountry.alias as toalias,code,classflight,typeflight,
            transit,direct,date_departure, departure,arrived,price,rating,total_review,fullname, nationality,
            payment_status, terminal, gate, total, FROM (((((((booking INNER JOIN users ON booking.idusers= users.idusers) INNER JOIN flight ON booking.idflight=flight.idflight) INNER JOIN airlines ON flight.idairlines=airlines.idairlines) 
            INNER JOIN cities as fromcity on flight.idfromcity=fromcity.idcities) 
            INNER JOIN countries as fromcountry ON fromcity.idcities=fromcountry.idcountries)
            INNER JOIN cities as tocity on flight.idtocity=tocity.idcities) 
            INNER JOIN countries as tocountry on tocity.idcities=tocountry.idcountries)
            WHERE users.idusers=${idusers}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getAllData2: (id) => {
        return new Promise((resolve, reject) => {
         database.query(`SELECT * FROM booking where`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
         database.query(`INSERT INTO booking SET ?`, data, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    update: (data, id) => {
        return new Promise((resolve, reject) => {
         database.query(`UPDATE booking SET ? WHERE  databaseooking = ?`, [data, id], (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
         database.query(`DELETE FROM booking WHERE  databaseooking='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    updatePayment: (data, id) => {
        return new Promise((resolve, reject) => {
         database.query(`UPDATE booking SET payment_status=1, image='${data.image}' WHERE  databaseooking='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = booking