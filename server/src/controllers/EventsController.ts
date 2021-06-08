import knex from '../database/connection'
import {Request, Response} from 'express'

class EventsController{
  async show (request: Request, response: Response){
    const {id} = request.params;

    const event = await knex('events').where('id', id).first();

    if(!event){
      return response.status(400).json({message: 'Event not found.'});
    }

    const insc = await knex('insc_event').join('event_users', 'insc_event.id', '=' , 'event_users.insc_id').where('event_users.event_id', id).select('insc_event.name','insc_event.email', 'insc_event.dt_nasc').orderBy('insc_event.name');

    return response.json({event, insc});
  }

  async index (request: Request, response: Response) {
    const events = await knex('events').select('*');
    return response.json(events);
  }

  async create (request: Request, response: Response){
    const {
      name,
      description,
      dt_init,
      dt_fin,
      qtd_vgs,
    } = request.body;
  
    await knex('events').insert({
      name,
      description,
      dt_init,
      dt_fin,
      qtd_vgs
    });
    
    return response.json({success: true});
  }
}

export default EventsController;