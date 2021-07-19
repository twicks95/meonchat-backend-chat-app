const express = require('express')
const Route = express.Router()
const { authentication } = require('../../middleware/auth')
const contactController = require('./contact_controller')

Route.get('/', authentication, contactController.getContactByUserAndFriendId)
Route.get('/:id', authentication, contactController.getContactByUserId)
Route.post('/:id', authentication, contactController.createContact)
Route.delete('/:id', authentication, contactController.deleteContactById)

module.exports = Route
