const { promise } = require('../config/database')
const connection = require('../config/database')

const testModel = () => {
    return new Promise((resolve, reject) => {
        connection.query('query here', [data, id], (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}


const readUser = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users where email = "${email}"`, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

const readUserId = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users where idusers = ${id}`, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

const readAlluser = () => {
    return new Promise((resolve,reject) => {
        connection.query('select * from users', (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const insertUsers = (data) => {
    return new Promise((resolve,reject) => {
        connection.query('INSERT INTO users SET ?', data,(err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const readAllairline = () => {
    return new Promise((resolve,reject) => {
        connection.query('SELECT * FROM airlines', (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const updateProfile = (data, idUser) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ? WHERE idusers = ?', [data, idUser], (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }

  const bookingPost = (data) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO booking SET ?', data, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

const bookingPost2 = (data) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO booking_list SET ?', data, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

const readBooking = (id) => {
    return new Promise((resolve,reject) => {
        connection.query(`SELECT * FROM booking where id = ${id}`, (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const readBookingList = (id) => {
    return new Promise((resolve,reject) => {
        connection.query(`SELECT * FROM booking_list where id = ${id}`, (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const readAllBookingList = (id) => {
    return new Promise((resolve,reject) => {
        connection.query(`SELECT * FROM booking_list where idusers = ${id}`, (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const putBooking = (id) => {
    return new Promise((resolve,reject) => {
        connection.query(`UPDATE booking_list SET status= 'success' where id = ${id}`, (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const successBooking = (id) => {
    return new Promise((resolve,reject) => {
        connection.query(`SELECT * FROM booking_list WHERE id = ${id} AND status = 'success'`, (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const readBookingDetail = (id) => {
    return new Promise((resolve,reject) => {
        connection.query(`SELECT * FROM booking_list WHERE id = ${id}`, (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

module.exports = {
    testModel,
    readUser,
    readUserId,
    readAlluser,
    insertUsers,
    readAllairline,
    updateProfile,
    bookingPost,
    bookingPost2,
    readBooking,
    readAllBookingList,
    putBooking,
    successBooking,
    readBookingDetail
}