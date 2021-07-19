const wrapper = require('../../helpers/wrapper')
const roomModel = require('./room_model')

module.exports = {
  getRooms: async (req, res) => {
    try {
      const { userId } = req.params

      const result = await roomModel.getRooms(userId)
      return wrapper.response(res, 200, 'Success Get Rooms', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getRoom: async (req, res) => {
    try {
      const { room, userId } = req.query

      const result = await roomModel.getRoom(room, userId)
      if (result.length > 0) {
        return wrapper.response(res, 200, `Success Get Room ${room}`, result)
      } else {
        return wrapper.response(res, 404, 'No Room')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  createRoom: async (req, res) => {
    try {
      const { roomChat, userId, friendId } = req.query

      const setData = {
        room_chat: roomChat,
        user_id: userId,
        friend_id: friendId
      }
      const setData2 = {
        room_chat: roomChat,
        user_id: friendId,
        friend_id: userId
      }

      const result = []
      result.push(await roomModel.postRoom(setData))
      result.push(await roomModel.postRoom(setData2))

      return wrapper.response(res, 200, 'Success Create Room', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
