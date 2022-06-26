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
      <Button title='ir a la galeria' color='tomato' onPress={()=>navigation.push('galeria')}/>
      <Button title='Persona 1' color='tomato' onPress={()=>navigation.push('infopersona',{
        Nombre:'Jesus',
        Bebida:'Agua'
      })}/>
      <Button title='Persona 2' color='tomato' onPress={()=>navigation.push('infopersona',{
        Nombre:'Ramon',
        Bebida:'Café'
      })}/>
      <Button title='Formulario' color='tomato' onPress={()=>navigation.push('formularios')}/>
      <TextInput
        style={{fontSize:30, color:'blue',backgroundColor:'white',height:40,width:300}}
        value={{}}
        placeholder="useless placeholder"
        keyboardType="default"
      />
      <Button title='Estado' color='tomato' onPress={()=>navigation.push('Estado')}/>
      <Button title="Login" color='blue' onPress={()=>navigation.push('Login')}/>
      <Button title="Interfaz" color='yellow' onPress={()=>navigation.push('Interfaz')}/>
    </View>
  );
}