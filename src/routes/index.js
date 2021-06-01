const express = require('express')
const Route = express.Router()

const authRouter = require('../modules/auth/auth_routes')
const userRouter = require('../modules/user/user_routes')
const contactRouter = require('../modules/contact/contact_routes')
const roomRouter = require('../modules/room/room_routes')
const chatRouter = require('../modules/chat/chat_routes')

Route.use('/auth', authRouter)
Route.use('/user', userRouter)
Route.use('/contact', contactRouter)
Route.use('/room', roomRouter)
Route.use('/chat', chatRouter)

module.exports = Route
