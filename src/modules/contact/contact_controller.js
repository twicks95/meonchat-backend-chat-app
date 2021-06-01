const wrapper = require('../../helpers/wrapper')
const contactModel = require('./contact_model')

module.exports = {
  createContact: async (req, res) => {
    try {
      const { id } = req.params
      const { friendId } = req.query

      const result = await contactModel.postContact({
        contact_user_id: id,
        contact_friend_id: friendId
      })
      return wrapper.response(res, 200, 'Success Create Contact', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getContactByUserAndFriendId: async (req, res) => {
    try {
      const { userId, friendId } = req.query

      const result = await contactModel.getDataConditions(userId, friendId)
      if (result.length > 0) {
        return wrapper.response(res, 200, 'Success Get Contact', result)
      } else {
        return wrapper.response(res, 404, 'No Contact')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getContactByUserId: async (req, res) => {
    try {
      const { id } = req.params

      const result = await contactModel.getContactByUserId(id)
      return wrapper.response(res, 200, 'Success Get Contact', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  deleteContactById: async (req, res) => {
    try {
      const { id } = req.params
      const { friendId } = req.query

      const result = await contactModel.deleteContactById(id, friendId)
      return wrapper.response(res, 400, 'Bad Request', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
