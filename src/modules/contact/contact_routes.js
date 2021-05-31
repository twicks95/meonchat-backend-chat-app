const express = require('express')
const Route = express.Router()

const contactController = require('./contact_controller')

Route.post('/:id', contactController.createContact)
Route.get('/:id', contactController.getContactByUserId)
Route.delete('/:id', contactController.deleteContactById)

module.exports = Route
