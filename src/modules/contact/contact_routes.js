const express = require('express')
const Route = express.Router()

const contactController = require('./contact_controller')

Route.get('/', contactController.getContactByUserAndFriendId)
Route.get('/:id', contactController.getContactByUserId)
Route.post('/:id', contactController.createContact)
Route.delete('/:id', contactController.deleteContactById)

module.exports = Route
