import React,{useState,  ChangeEvent, FormEvent} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import './styles.css'

import api from '../../services/api'

import logo from '../../assets/logo.png'

const CreateEvent = () =>{
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dt_init:'',
    dt_fin:'',
    qtd_vgs:''
  })

  const history = useHistory();

  function handleInputChange(event : ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target;

    setFormData({...formData, [name]: value})
  }
  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const {name, description, dt_init,dt_fin, qtd_vgs} = formData;

    const data = {
      name,
      description,
      dt_init,
      dt_fin,
      qtd_vgs
    };

    await api.post('events', data);
    alert('Evento criado com sucesso');

    history.push('/');
  }

  return(
    <div id="page-create-event">
      <header>
        <img src = {logo} alt='Eventos' width = '250' height = '90'/>
        <Link to ='/'>
          <FiArrowLeft/>
          Voltar para home
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Eventos</h1>
        <fieldset>
          <legend>
            <h2>Dados </h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome do evento</label>
            <input 
            type = 'text'
            name = 'name'
            id = 'name'
            onChange = {handleInputChange}
            />
          </div>
          <div className="field">
            <label htmlFor="description">Descrição</label>
            <input 
            type = 'text'
            name = 'description'
            id = 'description'
            onChange =  {handleInputChange}
            />
          </div>
          <div className="field-group">
          
         
          <div className="field">
            <label htmlFor="dt_init">Data de inicio</label>
            <input 
            type = 'date'
            name = 'dt_init'
            id = 'dt_init'
            onChange = {handleInputChange}
            />
          </div>
          <div className="field">
            <label htmlFor="dt_fin">Data de término</label>
            <input 
            type = 'date'
            name = 'dt_fin'
            id = 'dt_fin'
            onChange = {handleInputChange}
            />
          </div>
          <div className="field">
            <label htmlFor="qtd_vgs">Vagas</label>
            <input 
            type = 'number'
            name = 'qtd_vgs'
            id = 'qtd_vgs'
            onChange = {handleInputChange}
            />
          </div>
          </div>
          
         
        </fieldset>
        <button type = 'submit'>Cadastrar evento</button>
      </form>
    </div>
  )
}

export default CreateEvent;