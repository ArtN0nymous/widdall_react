import { LinearGradient } from "expo-linear-gradient";
import { View, TextInput, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import firebase from '../src/database/firebase';
import { useState } from "react";
import { Alert } from "react-native";
import CSS from './Styles'
import Funciones from './Funciones';
export default function Login({navigation}){
    const db  = firebase.db;
    const auth = firebase.auth;
    const App = Funciones.App;
    const Fire = Funciones.Firebase;
    var img  = require('./img/icon.png');
    var styles = CSS.styles;
    const [state,setState]= useState({
        email:'',
        password:''
    });
    const handleChangeText=(name,value)=>{
        setState({...state,[name]:value});
    }
    function checarDatos(){
        var result = App.checkUser(state.email,state.password);
        if(result.estado!=true){
            Alert.alert('Atención', result.message);
        }else{
            let login_res = Fire.loginIn(state.email,state.password);
            console.log(login_res);
            if(login_res.estado!=true){
                Alert.alert('Bienvenido',login_res.dato, [
                    {
                      text: "Aceptar",
                      onPress: navigation.push('Chats'),
                    }
                ]);
            }else{
                // switch(login_res.dato){
                //     case ''
                // }
                console.log(result.dato);
            }
        }
    }
    return(
        <>
        <View style={styles.contenerdor_login}>
            <LinearGradient colors={['#0364A3','#0695F3','#68BFF7','#0364A3']} style={styles.form_login}>
                <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                style={styles.border_image_login}>
                    <Image source={img} style={styles.imagen_login}/>
                </LinearGradient>
                <TextInput placeholder="Usuario" placeholderTextColor={'#1C9AB9'} autoFocus={true} keyboardType='email-address' style={styles.inputs_login} onChangeText={(value)=>handleChangeText('email',value)}/>
                <TextInput placeholder="Password" placeholderTextColor={'#1C9AB9'} style={styles.inputs_login} secureTextEntry={true} onChangeText={(value)=>handleChangeText('password',value)}/>
                <TouchableOpacity activeOpacity={0.6} onPress={checarDatos}>
                    <View  style={styles.boton_login}>
                        <View style={{justifyContent:'center', alignItems:'center', height:40}}>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Iniciar sesión</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Text style={{color:'white',fontSize:15,marginBottom:10}} onPress={()=>navigation.push('Registro')}>Registrarme ?</Text>
            </LinearGradient>
        </View>
        </>
    );
}