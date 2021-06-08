import knex from '../database/connection'
import {Request, Response} from 'express'

class InscController{
  async index (request: Request, response: Response) {
    const insc_events = await knex('insc_event').select('*');
    
    const serializedInsc = insc_events.map(insc_events =>{
      return{ 
        name: insc_events.name,
        email: insc_events.email,
        dt_nasc: insc_events.dt_nasc
      }
    })
  
    return response.json(serializedInsc);
  }

  async create(request: Request, response: Response) {
    
    const{
      name,
      email,
      dt_nasc,
      events
    } = request.body;
      
    const trx = await knex.transaction();
    const qtd : number []= await trx.select('qtd_vgs').from('events').where('id', events);

    const verif:number []= await trx('insc_event').join('event_users', 'insc_event.id', '=' , 'event_users.insc_id').where('event_users.event_id', events).count({a: 'insc_event.id'});

    let vgs;
    let insc;
    let qtd_vgs;
    let qtd_insc;

    qtd.forEach(function(entry){
      
      vgs = Object.values(entry);
      vgs.forEach(function(item, indice, array){
        qtd_vgs = item
      })
    })
    verif.forEach(function(entry){
     
     insc = Object.values(entry);
     insc.forEach(function(item, indice, array){
      qtd_insc = item;
    })
    })

    if(qtd_vgs === qtd_insc) {
      return response.status(400).json({message: 'Evento lotado.'});
      
    }else{
      const insc = {
        name,
        email,
        dt_nasc
       }
      
      const insertedIds = await trx('insc_event').insert(insc);
        
      const insc_id = insertedIds[0]; 
        
      const inscEvent = events.map((event_id: number) =>{
           return{
             event_id,
             insc_id
           }
      });
        
      await trx('event_users').insert(inscEvent);
      await trx.commit();
      
        
      return response.json({
        id: insc_id,
        ...insc
      })
      
    }
  }
}

export default InscController;