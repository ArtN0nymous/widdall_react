import { Text, StyleSheet, View, Alert } from "react-native";
import { Button } from "react-native";
import { useState, useEffect } from "react";
export default function Estado(){

    const[numero,setNumero]=useState(0);
    useEffect(()=>{
        //esto se ejecuta cuando cambie lo que está en los corchetes
        console.log('la variable numero cambio, vale: '+numero);
        if( numero > 3){
            Alert.alert('Demasiada pizza','🤣');
        }
    },[numero]);
    return(
        <>
            <View style={style.contenedor}>
                <Text style={style.texto}>Pediste <Text style={{color:'red'}}>{numero}</Text> pizzas</Text>
                <Button title="sumar" onPress={()=>setNumero(numero+1)}/>
                <Button title="reiniciar" onPress={()=>setNumero(0)}/>
            </View>
        </>
    );
}
const style = StyleSheet.create({
    contenedor:{
        flex:1,
        backgroundColor:'yellow',
        flexDirection:'column',
        alignItems:'center'
    },
    texto:{
        fontSize:20,
        fontWeight:'bold'
    }
});