const express = require("express")
// This method allow us to create router without server
// Cannot create server because there's already one in server.js
const route = express.Router()
const services = require('../services/render')
const controller = require('../controller/controller')
/**
 * @description Root Route
 * @method GET /
 */
route.get('/', services.homeRoutes)

/**
 * @description for adding a new user
 * @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 * @description for editing an existing user
 * @method GET /edit
 */
route.get('/edit', services.edit)

//API
//when making a request on the route, 
//a corresponding controller method is called
route.post('/api/players',controller.create)
route.get('/api/players',controller.find)//findAll or findone by query
route.put('/api/players/:id',controller.update)
route.delete('/api/players/:id',controller.delete)

module.exports = route