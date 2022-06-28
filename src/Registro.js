import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Button, TextInput, Image, StyleSheet,Alert } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import firebase from "../src/database/firebase";
export default function({navigation}){
    const db = firebase.db;
    const auth = firebase.auth;
    const get_auth = firebase.get_auth;
    function getdata(){
        /**
         * TRAER DATOS CONVERTIR A JSON
         */
        fetch('http://192.168.18.229/react-native-php/datos.php').then(res => res.json())
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
        console.log(state);
        await db.collection('users').add({
            usuario:state.name,
            password:state.password
        }).then((result)=>{
            Alert.alert('Exito','Usuario guardado');
        }).catch((err)=>{
            Alert.alert('Atención','Ha ocurrido un error!: '+err.message);
        });
    }
    const saveUser=async()=>{
        await auth.createUserWithEmailAndPassword(get_auth, state.name, state.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          Alert.alert('Atención','Usuario guardado');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert('Error',errorMessage);
          // ..
        });
    }
    var img = require('./img/default_profile.jpg');
    return(
        <>
        <LinearGradient style={styles.contenedor} colors={['#0364A3','#0695F3','#68BFF7','#0364A3']}>
            <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.border_image}>
                <Image source={img} style={styles.img}/>
            </LinearGradient>
            <TextInput keyboardType="email-address" placeholder="Nombre de usuario" placeholderTextColor={'blue'} style={styles.inputs} onChangeText={(value)=>handleChangeText('name',value)}/>
            <TextInput keyboardType="default" placeholder="Contraseña" secureTextEntry={true} placeholderTextColor={'blue'} style={styles.inputs} onChangeText={(value)=>handleChangeText('password',value)}/>
            <TextInput keyboardType="default" placeholder="Repita su contraseña" secureTextEntry={true} placeholderTextColor={'blue'} style={styles.inputs} onChangeText={(value)=>handleChangeText('password2',value)}/>
            <TouchableOpacity activeOpacity={0.6} onPress={newUser}>
                <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.login_btn}>
                    <Text style={styles.texts}>Registrarme</Text>
                </LinearGradient>
            </TouchableOpacity>
        </LinearGradient>
        </>
    );
}
const styles=StyleSheet.create({
    contenedor:{
        flex:1,
        alignItems:'center'
    },
    img:{
        width:70,
        height:70,
        borderRadius:90
    },
    border_image:{
        marginTop:10,
        width: 103,
        height: 103,
        borderRadius: 40,
        padding: 0,
        overflow: 'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    inputs:{
        borderColor:'blue',
        borderWidth:2,
        borderRadius:20,
        textAlign:'center',
        width:200,
        marginTop:10,
        backgroundColor:'rgba(0,0,0,0.15)',
        color:'#532FF1',
        fontWeight:'bold'
    },
    texts:{
        fontSize:10,
        color:'white',
        fontWeight:'bold'
    },
    login_btn:{
        width:70,
        height:35,
        borderRadius:10,
        marginTop:50,
        justifyContent:'center',
        alignItems:'center',
    }
});