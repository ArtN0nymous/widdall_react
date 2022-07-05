import react from "react"

import { Text, View, Button, TextInput } from "react-native"


export default function HolaMundo({navigation}){
  return(
    <View style={{
      backgroundColor:'black',
      flex:1,
      justifyContent:"center",
      borderColor:'red',
      borderWidth:30,
      marginTop:40,
      borderRadius:100
    }}>
      <Text style={{
        color:'white',
        fontSize:30,
        textAlign:"center"
        
      }}>Hola mundo !</Text>
      <Button title="Login" color='blue' onPress={()=>navigation.push('Login')}/>
      <Button title="Chats" color='purple' onPress={()=>navigation.push('Chats')}/>
      <Button title="Usuario" color='blue' onPress={()=>navigation.push('Usuario')}/>
    </View>
  );
}