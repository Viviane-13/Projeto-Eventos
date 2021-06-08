import React, {useEffect, useState, FormEvent, ChangeEvent} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import Moment from 'moment'
import api from '../../services/api'

import './styles.css'
import logo from '../../assets/logo.png'
import Axios from 'axios'



interface Event{
  id: number;
  name: string;
  description: string;
  dt_init: Date;
  dt_fin: Date;
  qtd_vgs: number;
}

const CreateInsc = () =>{
  

  const [events, setEvents] = useState<Event[]>([])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dt_nasc: '',
  })

  const history = useHistory();
  const [selectEvents, setSelectEvents] = useState<number[]>([]);

  
  useEffect(() =>{
    api.get('events').then(response =>{
      setEvents(response.data);
    })
  },[])

  

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target;
    setFormData({...formData, [name]:value})
  }
  function handleSelectEvent(id: number){
    const alreadySelected = selectEvents.findIndex(events => events === id);
    if(alreadySelected >=0){
      const filteredEvents = selectEvents.filter(events => events !== id)
      setSelectEvents(filteredEvents)
    }else{
      setSelectEvents([...selectEvents,id])
    }
    
  }
  async function handleSubmit(event: FormEvent){
    event.preventDefault();
    const {name, email,dt_nasc} = formData;
    const events = selectEvents;

    const data = {
      name,
      email,
      dt_nasc,
      events,
    };
    try{
      await api.post('insc_event', data);
      alert('Inscrição realizada com sucesso!');
      history.push('/')
    }catch(err){
      alert('Evento lotado!')
      history.push('/')
    }   
  }
  return(
    <div id="page-create-insc">
      <header>
        <img src={logo} alt= 'logo' width = '250' height = '90'/>
         <Link to = '/'>
           <FiArrowLeft/>
           Voltar para home
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <h1>Inscrição no <br/> evento</h1>
        <fieldset>
          <legend>
            <h2>Dados do participante</h2>
          </legend>
          <div className="field">
            <label htmlFor= 'name'>Nome do participante</label>
            <input
              type='text'
              name = 'name'
              id = 'name'
              onChange = {handleInputChange}
            />
          </div>
          <div className="field-group">
          <div className="field">
            <label htmlFor= 'email'>E-mail</label>
            <input
              type='email'
              name = 'email'
              id = 'email'
              onChange = {handleInputChange}
            />
          </div>
          <div className="field">
            <label htmlFor= 'dt_nasc'>Data de nascimento</label>
            <input
              type='date'
              name = 'dt_nasc'
              id = 'dt_nasc'
              onChange = {handleInputChange}
            />
          </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Eventos</h2>
            <span>Selecione o evento</span>
          </legend>
          <ul className = 'events-grid'>
            {events.map(events =>(
              
              <li 
                key = {events.id} onClick = {()=> handleSelectEvent(events.id)  } 
                className = {selectEvents.includes(events.id) ? 'selected' : ''}
                >
                <span style={{fontSize: 24}}>{events.name}</span>
                <span>{events.description}</span>
                <span>Data: {Moment(events.dt_init).format('DD/MM/yyyy')} à {Moment(events.dt_fin).format('DD/MM/yyyy')}</span>
               
                <span>Quantidade de vagas: {events.qtd_vgs}</span>
                
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">Cadastrar inscrição</button>
      </form>

    </div>
  )
}
export default CreateInsc;