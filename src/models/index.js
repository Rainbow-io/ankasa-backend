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


module.exports = {
    testModel
}