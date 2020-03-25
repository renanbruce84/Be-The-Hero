const express = require('express');

const OngController = require ('./controllers/OngController');
const incidentController = require ('./controllers/incidentController');
const ProfileController = require ('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', SessionController.create);

// SELECT e INSERT
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

// SELECT, INSERT e DELETE
routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);


module.exports = routes;