import React from 'react';
import {FiLogIn} from 'react-icons/fi'
import {Link} from 'react-router-dom'


import './style.css'
import logo from '../../assets/logo.png';

const Home = () =>{
  return(
    <div id="page-home">
      <div className="content">
       <header>
       <img src = {logo} alt='Eventos' width = '250' height = '90'/>
       </header>
       <main>
         <h1>Sua plataforma de cadastro de Eventos</h1>
         <p>Ajudamos pessoas divulgarem seus eventos de forma eficiente</p>
        
         <Link to='/create-event'  >
           <span>
             <FiLogIn/>
           </span>
           <strong className = 'link'>
              Cadastre um evento
           </strong>
          </Link>
         <Link to='/create-insc'  >
           <span>
             <FiLogIn/>
           </span>
           <strong className = 'link' >
             
             Inscreva-se nos eventos
           </strong>
         </Link>
       </main>
      </div>
    </div>
  )
}

export default Home;