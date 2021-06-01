const db = require('../../config/mysql')

module.exports = {
  getChat: (roomChat) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT chat.room_chat, chat.receiver_id, chat.sender_id, chat.message, users.user_image FROM chat JOIN users ON chat.sender_id = users.user_id WHERE room_chat = ?',
        roomChat,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  postChat: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO chat SET ?', data, (error, result) => {
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
