const express = require('express')
const Route = express.Router()
const { authentication } = require('../../middleware/auth')
const chatController = require('./chat_controller')

Route.get('/:room', authentication, chatController.getChat)
Route.post('/', authentication, chatController.createChat)

module.exports = Route
