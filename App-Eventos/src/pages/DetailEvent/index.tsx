import React, {useEffect, useState} from 'react'
import {Feather as Icon} from '@expo/vector-icons'
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native'
import Moment from 'moment'

import { useNavigation, useRoute } from '@react-navigation/native'
import {RectButton, ScrollView} from 'react-native-gesture-handler'
import api from '../../services/api'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'

interface Params{
  event_id: number
}

interface Data{
  event:{
    name: string,
    description: string,
  };
  insc:{
    name: string;
    email: string;
    dt_nasc: Date;
  }[];
}


const DetailEvent = () =>{
  const [data, setData] = useState<Data>({} as Data)

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;
  useEffect(() =>{
    api.get(`events/${routeParams.event_id}`).then((response)=>{
      setData(response.data)
    })
  },[])
  function handleNavigateBack(){
    navigation.goBack();
  }
  if(!data.event){
    return null
  }

  return(
    <View style = {{flex: 1}}>
    <View style = {styles.container}>
      <TouchableOpacity onPress = {handleNavigateBack}>
        <Icon name = 'arrow-left' size = {20} color= '#fff'/>
      </TouchableOpacity>
    <Text style={styles.eventName}>{data.event.name}</Text>
   
    <Text style = {styles.eventName}></Text>
    <Text style = {styles.infoTitle}>Participantes</Text>

    <ScrollView>
      {data.insc.map((inscs)=> (
        <View style = {{marginBottom: 30}} key = {String(inscs.email)}>
          <Text  style={styles.info}>Nome: {inscs.name}</Text>
           <Text  style={styles.info}>E-mail: {inscs.email}</Text>
      <Text  style={styles.info}>Data de nasc: {Moment(inscs.dt_nasc).format('DD/MM/yyyy')}</Text>
        </View>
      
      ))}
    </ScrollView>

    

    
    
    </View>
    
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
  },

  eventName: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
    textAlign: 'center'
  },
  info: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18,
    color: "#fff",
    marginTop: 10
  },

  address: {
    marginTop: 32,
  },

  infoTitle: {
  
    color: "#fff",
    fontFamily: "Roboto_500Medium",
    fontSize: 19,
    
  },

  addressContent: {
    fontFamily: "Roboto_400Regular",
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

});


export default DetailEvent;