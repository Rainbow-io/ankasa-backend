const redis = require("redis");
const redisClient = redis.createClient();

const { success } = require('../helpers/response')

const _ = require('lodash');

module.exports = {
    getAirlines: (req, res, next) => {
        redisClient.get('airlines', (err, reply) => {
            const data = JSON.parse(reply)
            if (reply) {
                success(res, data, 'Get data from redis success')
            } else {
                next()
            }
        })
    },

    getBooking: (req, res, next) => {
        redisClient.get('booking', (err, reply) => {
            const data = JSON.parse(reply)
            if (reply) {
                success(res, data, 'Get data from redis success')
            } else {
                next()
            }
        })
    },

    getAllCountry: (req, res, next) => {
        redisClient.get('countries', (err, reply) => {
            const data = JSON.parse(reply)
            if (reply) {
                success(res, data, 'Get data from redis success')
            } else {
                next()
            }
        })
    },

    getAllCities: (req, res, next) => {
        redisClient.get('cities', (err, reply) => {
            const data = JSON.parse(reply)
            if (reply) {
                success(res, data, 'Get data from redis success')
            } else {
                next()
            }
        })
    },

    getAllFlight: (req, res, next) => {
        redisClient.get('flight', (err, reply) => {
            const data = JSON.parse(reply)
            if (reply) {
                success(res, data, 'Get data from redis success')
            } else {
                next()
            }
        })
    },
}