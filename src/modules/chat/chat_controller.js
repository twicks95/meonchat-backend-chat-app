const wrapper = require('../../helpers/wrapper')
const chatModel = require('./chat_model')

module.exports = {
  getChat: async (req, res) => {
    try {
      const { room } = req.params

      const result = await chatModel.getChat(room)
      return wrapper.response(res, 200, 'Success Get Chat', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  createChat: async (req, res) => {
    try {
      const { roomChat, senderId, receiverId, message } = req.body

      const setData = {
        room_chat: roomChat,
        sender_id: senderId,
        receiver_id: receiverId,
        message
      }

      const result = await chatModel.postChat(setData)
      return wrapper.response(res, 200, 'Success Create Chat', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
