import express from 'express';


import InscController from './controllers/InscController'
import EventsController from './controllers/EventsController'

const routes = express.Router();
const inscController = new InscController();
const eventsController = new EventsController();

routes.post('/events', eventsController.create);
routes.get('/events',eventsController.index);
routes.get('/events/:id', eventsController.show)

routes.post('/insc_event',inscController.create);
routes.get('/insc_event',inscController.index);

export default routes;