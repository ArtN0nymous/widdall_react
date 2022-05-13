import react from "react"

import { Text, View } from "react-native"


export default function App(){

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
    </View>
  );
}