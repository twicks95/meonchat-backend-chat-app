const wrapper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authModel = require('./auth_model')

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body

      const emailRegistered = await authModel.getDataConditions({
        user_email: email
      })

      if (emailRegistered > 0) {
        return wrapper.response(res, 409, 'Email has been registered')
      } else {
        const salt = bcrypt.genSaltSync(10)
        const encryptedPassword = bcrypt.hashSync(password, salt)

        const setData = {
          user_name: name,
          user_email: email,
          user_password: encryptedPassword
        }

        const result = await authModel.register(setData)
        delete result.user_password

        return wrapper.response(res, 200, 'Create User Successfully', result)
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const emailRegistered = await authModel.getDataConditions({
        user_email: email
      })

      // checking email availability in database
      if (emailRegistered.length > 0) {
        // If userEmail exist, as password in database has been encrypted, use bcrypt.compareSync to compare encrypted password with user inputted password in login form
        const doesPasswordMatch = bcrypt.compareSync(
          password,
          emailRegistered[0].user_password
        )

        // if doesPasswordMatch returned true (means match)
        if (doesPasswordMatch) {
          const payLoad = emailRegistered[0]

          // remove object's property using delete
          delete payLoad.user_password

          // token signature creating process
          const token = jwt.sign({ ...payLoad }, 'RAHASIA', {
            expiresIn: '24h'
          })

          const result = { ...payLoad, token }
          return wrapper.response(res, 200, 'Login Success', result)
        } else {
          return wrapper.response(res, 401, 'Wrong Password')
        }
      } else {
        return wrapper.response(res, 404, 'Email or Account Not Found')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
