const redis = require('redis')
const client = redis.createClient()
const wrapper = require('../helpers/wrapper')

module.exports = {
  getUserByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getmovie:${id}`, (error, result) => {
      if (!error && result != null) {
        return wrapper.response(
          res,
          200,
          'Success Get Movie By Id',
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },

  clearDataUserRedis: (req, res, next) => {
    client.keys('getmovie*', (_error, result) => {
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      next()
    })
  }
}
