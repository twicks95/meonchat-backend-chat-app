const wrapper = require('../../helpers/wrapper')

const fs = require('fs')
const bcrypt = require('bcrypt')

// const redis = require('redis')
// const client = redis.createClient()

const userModel = require('./user_model')

module.exports = {
  getUserById: async (req, res) => {
    try {
      let { userId, userEmail } = req.query
      if (!userId) {
        userId = ''
      }
      if (!userEmail) {
        userEmail = ''
      }

      console.log(userId)
      console.log(userEmail)

      const result = await userModel.getUserById(userId, userEmail)
      delete result[0].user_password

      // client.set(
      //   userId ? `getuser:${userId}` : `getuser:${userEmail}`,
      //   JSON.stringify(result)
      // )

      return wrapper.response(res, 200, 'Success Get Data By Id', result)
    } catch (error) {
      // console.log(error)
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updateUserImage: async (req, res) => {
    try {
      const { id } = req.params

      const dataToUpdate = await userModel.getUserById(id)
      if (dataToUpdate.length > 0) {
        const imageToDelete = dataToUpdate[0].user_image
        const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)

        if (isImageExist && imageToDelete) {
          fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
            if (err) throw err
          })
        }

        const result = await userModel.updateUserData(id, {
          user_image: req.file ? req.file.filename : '',
          user_updated_at: new Date(Date.now())
        })
        return wrapper.response(res, 200, 'Success Update User Image', result)
      } else {
        return wrapper.response(res, 404, 'Failed! No Data Is Updated')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updateUserName: async (req, res) => {
    try {
      const { id } = req.params
      const { name } = req.body

      const dataToUpdate = await userModel.getUserById(id)
      if (dataToUpdate.length > 0) {
        const result = await userModel.updateUserData(id, {
          user_name: name,
          user_updated_at: new Date(Date.now())
        })
        return wrapper.response(res, 200, 'Success Update Name', result)
      } else {
        return wrapper.response(res, 404, 'Failed! No Data Is Updated')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updateUserUsername: async (req, res) => {
    try {
      const { id } = req.params
      const { username } = req.body

      const dataToUpdate = await userModel.getUserById(id)
      if (dataToUpdate.length > 0) {
        const result = await userModel.updateUserData(id, {
          user_username: username,
          user_updated_at: new Date(Date.now())
        })
        return wrapper.response(res, 200, 'Success Update Username', result)
      } else {
        return wrapper.response(res, 404, 'No User Data Updated')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updateUserPhone: async (req, res) => {
    try {
      const { id } = req.params
      const { phone } = req.body

      const dataToUpdate = await userModel.getUserById(id)
      if (dataToUpdate.length > 0) {
        const result = await userModel.updateUserData(id, {
          user_phone: phone,
          user_updated_at: new Date(Date.now())
        })
        return wrapper.response(res, 200, 'Success Update Phone Number', result)
      } else {
        return wrapper.response(res, 404, 'No User Data Updated')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updateUserBio: async (req, res) => {
    try {
      const { id } = req.params
      const { bio } = req.body

      const dataToUpdate = await userModel.getUserById(id)
      if (dataToUpdate.length > 0) {
        const result = await userModel.updateUserData(id, {
          user_bio: bio,
          user_updated_at: new Date(Date.now())
        })
        return wrapper.response(res, 200, 'Success Update Bio', result)
      } else {
        return wrapper.response(res, 404, 'No User Data Updated')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updateUserPassword: async (req, res) => {
    try {
      const salt = bcrypt.genSaltSync(10)

      const { id } = req.params
      const { newPassword, confirmPassword } = req.body

      const dataToUpdate = await userModel.getUserById(id)
      const passwordConfirmed = newPassword === confirmPassword

      if (passwordConfirmed && dataToUpdate.length > 0) {
        const encryptedPassword = bcrypt.hashSync(newPassword, salt)
        const setData = {
          user_password: encryptedPassword,
          user_updated_at: new Date(Date.now())
        }

        const result = await userModel.updateUserData(id, setData)
        delete result.user_password

        return wrapper.response(res, 200, 'Success Update Password', result)
      } else if (dataToUpdate.length === 0) {
        return wrapper.response(res, 404, 'No User Data Updated')
      } else {
        return wrapper.response(
          res,
          401,
          "New and Confirm Password Didn't Match"
        )
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
