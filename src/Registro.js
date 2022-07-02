import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Button, TextInput, Image, StyleSheet,Alert } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import firebase from "../src/database/firebase";
import CSS from './Styles';
import Funciones from "./Funciones";
export default function({navigation}){
    const db = firebase.db;
    const auth = firebase.auth;
    var styles = CSS.styles;
    const App = Funciones.App;
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
    const [state,setState] = useState({
        email:'',
        name:'',
        password:'',
        password2:''
    });

    const handleChangeText = (name,value)=>{
        setState({...state,[name]:value})
    }
    function checarDatos(){
        var result = App.newUser(state.email,state.name,state.password,state.password2);
        if(result.estado!=false){
            saveUser();
        }else{
            Alert.alert(result.dato,result.message);
        }
    }
    const guardar= async () =>{
        await db.collection('users').add({
            email:state.email,
            usuario:state.name,
            url_photo:''
        }).then((result)=>{
            navigation.push('Login');
        }).catch((err)=>{
            Alert.alert('Atención','Ha ocurrido un error!: '+err.message);
        });
    }
    const saveUser=async()=>{
        await auth.createUserWithEmailAndPassword(state.email, state.password)
        .then((userCredential) => {
          const user = userCredential.user;
          guardar();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode+' '+errorMessage);
          switch(errorCode){
            case 'auth/email-already-in-use':
                Alert.alert('Ups!','Parece que este usuario ya está registrado intenta iniciar sesión.');
                break;
            case 'auth/too-many-requests':
                Alert.alert('Atención','El acceso a esta cuenta ha sido bloqueado temporalmente por demasiados intentos fallidos, puedes intentar reestablecer tu contraseña.');
                break;
        }
        });
    }
    var img = require('./img/default_profile.jpg');
    return(
        <>
        <LinearGradient style={styles.contenedor_regist} colors={['#0364A3','#0695F3','#68BFF7','#0364A3']}>
            <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.border_image_regist}>
                <Image source={img} style={styles.img_regist}/>
            </LinearGradient>
            <TextInput keyboardType="email-address" placeholder="Correo" placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('email',value)}/>
            <TextInput keyboardType="default" placeholder="Nombre de usuario" placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('name',value)}/>
            <TextInput keyboardType="default" placeholder="Contraseña" secureTextEntry={true} placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('password',value)}/>
            <TextInput keyboardType="default" placeholder="Repita su contraseña" secureTextEntry={true} placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('password2',value)}/>
            <TouchableOpacity activeOpacity={0.6} onPress={checarDatos}>
                <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.login_btn_regist}>
                    <Text style={styles.texts_regist}>Registrarme</Text>
                </LinearGradient>
            </TouchableOpacity>
        </LinearGradient>
        </>
    );
}