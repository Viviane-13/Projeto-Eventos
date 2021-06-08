import React, {useState, useEffect} from 'react'
import Constants from 'expo-constants'
import {Feather as Icon} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native'
import api from '../../services/api'
import { Roboto_700Bold } from '@expo-google-fonts/roboto'

interface Event{
  id: number,
  name: string,
  description: string,
  dt_init: Date,
  dt_fin: Date,
  qtd_vgs: number,
}

const Eventos = () =>{
  const [events, setEvents] =  useState<Event[]>([]);
  const navigation = useNavigation();

  useEffect(() =>{
    api.get('/events').then(response=>{
    setEvents(response.data)
    })
  },[])

  function handleNavigateBack(){
    navigation.goBack();
  }

  function handleNavigateToDetailEvent(id: number){
   navigation.navigate('DetailEvent', {event_id: id})
  }

  return (
    <View style={styles.container}>
      
      <TouchableOpacity>
        <Icon name = 'arrow-left' size={20} color= '#fff' onPress={handleNavigateBack}/>
      </TouchableOpacity>
      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Confira a lista de participantes nos eventos</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style = {styles.itemsContainer}>
        
          {events.map(events =>(
            <TouchableOpacity key={String(events.id)} style={styles.item} onPress = {() => handleNavigateToDetailEvent(events.id)}
            activeOpacity = {0.6}
            >
            <Text style = {styles.itemTitle}>{events.name}</Text>
            
          </TouchableOpacity>
          ))}
         
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
    
  },

  title: {
    fontSize: 20,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
    color: '#fff'
  },

  description: {
    color: "#fff",
    fontSize: 16,
    marginTop: 4,
    fontFamily: "Roboto_400Regular",
  },

  itemsContainer: {
    flexDirection: "row",
    flexWrap: 'wrap',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  item: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eee",
    height: 60,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 15,
    marginBottom: 15,
    
  },


  itemTitle: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 13,
    fontWeight: 'bold',
    
  },
});


export default Eventos;