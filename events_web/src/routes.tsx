import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/Home'
import CreateEvent from './pages/CreateEvent'
import CreateInsc from './pages/CreateInsc'


const Routes = () => {
  return(
    <BrowserRouter>
      <Route component = {Home} path='/' exact/>
      <Route component = {CreateEvent} path='/create-event'/>
      <Route component = {CreateInsc} path='/create-insc'/>
     
    </BrowserRouter>
  )
}
export default Routes;