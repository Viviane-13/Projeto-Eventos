import React from 'react'
import {NavigationContainer} from '@react-navigation/native'

import {createStackNavigator} from '@react-navigation/stack'

import Home from './pages/Home'
import Eventos from './pages/Eventos'

import DetailEvent from './pages/DetailEvent'

const AppStack = createStackNavigator();

const Routes = ()=>{
  return(
    <NavigationContainer>
      <AppStack.Navigator headerMode='none'
      screenOptions={{
        cardStyle:{
          backgroundColor: '#360568'
        }
      }}
      >
        <AppStack.Screen name = 'Home' component={Home}/>
        <AppStack.Screen name = 'Eventos' component={Eventos}/>
        <AppStack.Screen name = 'DetailEvent' component ={DetailEvent}/>
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
 export default Routes;

