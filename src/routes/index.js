const express = require('express')
const Route = express.Router()

const authRouter = require('../modules/auth/auth_routes')
const userRouter = require('../modules/user/user_routes')
const contactRouter = require('../modules/contact/contact_routes')

Route.use('/auth', authRouter)
Route.use('/user', userRouter)
Route.use('/contact', contactRouter)

module.exports = Route
