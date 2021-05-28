const db = require('../../config/mysql')

module.exports = {
  getDataConditions: (data) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE ?', data, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },

  register: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users SET ?', data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
