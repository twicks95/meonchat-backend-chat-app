const db = require('../../config/mysql')

module.exports = {
  getRooms: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT rooms.room_chat, rooms.friend_id, users.user_name, users.user_image FROM rooms JOIN users ON rooms.friend_id = users.user_id WHERE rooms.user_id = ?',
        userId,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postRoom: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO rooms SET ?', data, (error, result) => {
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
