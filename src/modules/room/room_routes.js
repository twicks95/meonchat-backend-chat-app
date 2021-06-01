const express = require('express')
const Route = express.Router()

const roomController = require('./room_controller')

Route.post('/', roomController.createRoom)
Route.get('/:userId', roomController.getRooms)

module.exports = Route
