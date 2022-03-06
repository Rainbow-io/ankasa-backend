require('dotenv').config()

module.exports = {
    PRIVATEKEY: process.env.PRIVATEKEY,
    PORT: process.env.PORT,
    PORT_AWS: process.env.PORT_AWS,
    EMAIL: process.env.EMAIL,
    PASSWORD_EMAIL: process.env.PASSWORD_EMAIL
}