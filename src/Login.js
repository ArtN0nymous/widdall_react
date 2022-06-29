import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, TextInput, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";
import firebase from '../src/database/firebase';
import { useState } from "react";
import { Alert } from "react-native";
const db  = firebase.db;
const auth = firebase.auth;
export default function Login({navigation}){
    var img  = require('./img/sebas.jpg');
    var fondo = require('./img/fondo.jpg');
    const [state,setState]= useState({
        email:'',
        password:''
    });
    const handleChangeText=(name,value)=>{
        setState({...state,[name]:value});
    }
    function checkUser(){
        if(state.email!=""){
            if(state.password!=""){
                loginIn();
            }else{
                Alert.alert('Atención','Debes ingresar tu contraseña');
            }
        }else{
            Alert.alert('Atención','Debes ingresar un correo');
        }
    }
    const loginIn = async ()=>{
        await auth.signInWithEmailAndPassword(state.email,state.password)
        .then((result)=>{
            Alert.alert('Bienvenido',result.user.email, [
                {
                  text: "Aceptar",
                  onPress: () => navigation.push('galeria'),
                }
              ]);
        })
        .catch((error)=>{
            Alert.alert(error.code,error.message);
        });
    }
    return(
        <>
        <ImageBackground style={styles.contenerdor} source={fondo}>
            <LinearGradient colors={['rgba(106, 178, 189, 0.6)','rgba(8,112,128,0.6)','rgba(10, 54, 61, 0.6)']} style={styles.form}>
            <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={styles.border_image}>
                <Image source={img} style={styles.imagen}/>
            </LinearGradient>
                <TextInput placeholder="Usuario" placeholderTextColor={'#1C9AB9'} autoFocus={true} keyboardType='email-address' style={styles.inputs} onChangeText={(value)=>handleChangeText('email',value)}/>
                <TextInput placeholder="Password" placeholderTextColor={'#1C9AB9'} style={styles.inputs} secureTextEntry={true} onChangeText={(value)=>handleChangeText('password',value)}/>
                <TouchableOpacity activeOpacity={0.6} onPress={checkUser}>
                    <View  style={styles.boton}>
                        <View style={{justifyContent:'center', alignItems:'center', height:40}}>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'#4DD6F8'}}>Login</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Text style={{color:'white',fontSize:15,marginBottom:10}} onPress={()=>navigation.push('Registro')}>Registrarme ?</Text>
            </LinearGradient>
        </ImageBackground>
        </>
    );
}
const styles =StyleSheet.create({
    contenerdor:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    imagen:{
        borderRadius:50,
        width:100,
        height:100,
        borderColor:'#0895B9',
        borderWidth:2
    },
    text:{
        fontSize:30
    },
    inputs:{
        fontSize:20,
        alignSelf:'stretch',
        height:40,
        backgroundColor:'white',
        textAlign:'center',
        borderColor:'#61DAF9',
        borderRadius:10,
        marginTop:10,
        marginRight:40,
        marginLeft:40,
        borderWidth:2,
        color:'blue'
    },
    boton:{
        width:90,
        height:40,
        backgroundColor:'black',
        borderColor:'#4DD6F8',
        borderWidth:2,
        borderRadius:10,
        marginTop:10,
        marginBottom:10
    },
    form:{
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'stretch',
        borderRadius:20,
        margin:10
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
    }
})