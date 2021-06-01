const express = require('express')
const Route = express.Router()
const chatController = require('./chat_controller')

Route.get('/:room', chatController.getChat)
Route.post('/', chatController.createChat)

module.exports = Route
