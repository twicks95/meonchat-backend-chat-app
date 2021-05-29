const express = require('express')
const Route = express.Router()

const authMiddleware = require('../../middleware/auth')
const uploadImage = require('../../middleware/uploads')
const redisMiddleware = require('../../middleware/redis')

const userController = require('./user_controller')

Route.get('/:id', redisMiddleware.getUserByIdRedis, userController.getUserById)
Route.patch(
  '/update/name/:id',
  authMiddleware.authentication,
  redisMiddleware.clearDataUserRedis,
  userController.updateUserName
)
Route.patch(
  '/update/username/:id',
  authMiddleware.authentication,
  redisMiddleware.clearDataUserRedis,
  userController.updateUserUsername
)
Route.patch(
  '/update/phone/:id',
  authMiddleware.authentication,
  redisMiddleware.clearDataUserRedis,
  userController.updateUserPhone
)
Route.patch(
  '/update/bio/:id',
  authMiddleware.authentication,
  redisMiddleware.clearDataUserRedis,
  userController.updateUserBio
)
Route.patch(
  '/update/password/:id',
  authMiddleware.authentication,
  redisMiddleware.clearDataUserRedis,
  userController.updateUserPassword
)
Route.patch(
  '/update/image/:id',
  authMiddleware.authentication,
  uploadImage,
  redisMiddleware.clearDataUserRedis,
  userController.updateUserImage
)

module.exports = Route
