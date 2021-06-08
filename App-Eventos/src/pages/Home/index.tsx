import React from 'react'
import {Feather as Icon} from '@expo/vector-icons'
import {View, Text, StyleSheet} from 'react-native'
import {RectButton} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'

const Home = () =>{
  const navigation = useNavigation();

  function handleNavigateToEvents(){
    navigation.navigate('Eventos')
  }
  return (
    <View style = {styles.container}>
      <View style = {styles.main}>
        <Text style = {styles.title}>
          Eventos
        </Text>
        <Text style = {styles.descripition}>
          Ajudamos pessoas divulgarem seus eventos de forma eficiente!
        </Text>
      </View>
      <View style = {styles.footer}>
        <RectButton style = {styles.button} onPress={handleNavigateToEvents}>
          <View style = {styles.buttonIcon}>
            <Text> 
              <Icon name = 'arrow-right' color='#fff' size={24}/>
            </Text>
          </View>
          <Text style = {styles.buttonText}>Acessar</Text>
        </RectButton>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 32,
    
  },
  main: {
    flex: 1,
    justifyContent: 'center'
  },
  title:{
    color: '#fff',
    //color: '#efb0a1',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260, 
    marginTop: 64
  },
  descripition:{
    color: '#fff',
    //color: '#f4afb4',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24
  },
  footer:{

  },
  button:{
    backgroundColor:'#18beb9',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: "hidden",
    alignItems: 'center',
    marginTop: 8
  },
  buttonIcon:{
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems:'center',
  },
  buttonText:{
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16
  }
})

export default Home;