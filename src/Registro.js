import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Button, TextInput, Image, StyleSheet,Alert } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import firebase from "../src/database/firebase";
import CSS from './Styles'
export default function({navigation}){
    const db = firebase.db;
    const auth = firebase.auth;
    var styles = CSS.styles;
    function getdata(){
        /**
         * TRAER DATOS CONVERTIR A JSON
         */
        console.log(`Contenido de las variables: Nombre: ${state.name}, Password: ${state.password}, Confirm password: ${state.password2}`);
        var datos = new FormData();
        datos.append('nombre',state.name);
        datos.append('password',state.password);
        datos.append('password2',state.password2);
        fetch('http://192.168.18.229/react-native-php/datos.php',{
            method:'post',
            body:datos
        }).then(res => res.json())
        /**LEER DATOS */
        .then(function(result){
            console.log(result);
            console.log(result.mensaje);
        });
    }
    function sentdata(){

    }
    const [state,setState] = useState({
        name:'',
        password:'',
        password2:''
    });

    const handleChangeText = (name,value)=>{
        setState({...state,[name]:value})
    }

    function newUser(){
        if(state.name!=""){
            if(state.password!=""){
                if(state.password2!=""){
                    if(state.password == state.password2){
                        saveUser();
                    }else{
                        Alert.alert('Atención','Su contraseña no coincide');
                    }
                }else{
                    Alert.alert('Atención','Debe confirmar su contraseña');
                }
            }else{
                Alert.alert('Atención', 'Debe ingresar una contraseña');
            }
        }else{
            Alert.alert('Atención','El usuario no puede estar vacío');
        }
    }
    const guardar= async () =>{
        await db.collection('users').add({
            usuario:state.name,
            password:state.password
        }).then((result)=>{
            //Alert.alert('Exito','Usuario guardado');
            navigation.push('Login');
        }).catch((err)=>{
            Alert.alert('Atención','Ha ocurrido un error!: '+err.message);
        });
    }
    const saveUser=async()=>{
        await auth.createUserWithEmailAndPassword(state.name, state.password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigation.push('Login');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(errorCode,errorMessage);
        });
    }
    var img = require('./img/default_profile.jpg');
    return(
        <>
        <LinearGradient style={styles.contenedor_regist} colors={['#0364A3','#0695F3','#68BFF7','#0364A3']}>
            <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.border_image_regist}>
                <Image source={img} style={styles.img_regist}/>
            </LinearGradient>
            <TextInput keyboardType="email-address" placeholder="Nombre de usuario" placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('name',value)}/>
            <TextInput keyboardType="default" placeholder="Contraseña" secureTextEntry={true} placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('password',value)}/>
            <TextInput keyboardType="default" placeholder="Repita su contraseña" secureTextEntry={true} placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('password2',value)}/>
            <TouchableOpacity activeOpacity={0.6} onPress={newUser}>
                <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.login_btn_regist}>
                    <Text style={styles.texts_regist}>Registrarme</Text>
                </LinearGradient>
            </TouchableOpacity>
        </LinearGradient>
        </>
    );
}