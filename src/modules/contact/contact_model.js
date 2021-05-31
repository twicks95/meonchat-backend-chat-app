const db = require('../../config/mysql')

module.exports = {
  // getDataConditions: () => {
  //   return new Promise((resolve, reject) => {
  //     db.query()
  //   })
  // },
  postContact: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO contact SET ?', data, (error, result) => {
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
  },
  getContactByUserId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM contact JOIN users ON contact.contact_friend_id = users.user_id WHERE contact.contact_user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deleteContactById: (userId, friendId) => {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM contact WHERE contact_user_id = ? && contact_friend_id = ?',
        [userId, friendId],
        (error, result) => {
          if (!error) {
            const newResult = {
              contact_user_id: userId,
              contact_friend_id: friendId
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
