const express = require('express')
const Route = express.Router()
const { authentication } = require('../../middleware/auth')
const roomController = require('./room_controller')

Route.post('/', authentication, roomController.createRoom)
Route.get('/', authentication, roomController.getRoom)
Route.get('/:userId', authentication, roomController.getRooms)

module.exports = Route
