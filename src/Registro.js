import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Input_per, Image,Alert,TouchableOpacity,Animated,TextInput } from "react-native";
import { useState } from "react";
import * as Animatable from 'react-native-animatable';
import firebase from "../src/database/firebase";
import CSS from './Styles';
import Funciones from "./Funciones";
export default function({navigation}){
    const Lineargra_per = Animatable.createAnimatableComponent(LinearGradient);
    const Input_per = Animatable.createAnimatableComponent(TextInput);
    const db = firebase.db;
    const auth = firebase.auth;
    var styles = CSS.styles;
    const App = Funciones.App;
    const [state,setState] = useState({
        email:'',
        name:'',
        password:'',
        password2:'',
        img : require('./img/default_profile.jpg')
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
    function selectIMG(){
        var img_1 = {uri:'https://i.pinimg.com/originals/9d/61/da/9d61da9411f8d03f35d658990daf021f.jpg'};
        setState({...state,img:img_1});
        console.log(state.img);
    }
    return(
        <>
        <LinearGradient style={styles.contenedor_regist} colors={['#0364A3','#0695F3','#68BFF7','#0364A3']}>
            <TouchableOpacity activeOpacity={0.6} onPress={selectIMG}>
                <Lineargra_per animation='bounceIn' colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.border_image_regist}>
                    <Image source={state.img} style={styles.img_regist}/>
                </Lineargra_per>
            </TouchableOpacity>
            <Input_per animation='bounceInRight' keyboardType="email-address" placeholder="Correo" placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('email',value)}/>
            <Input_per animation='bounceInLeft' keyboardType="default" placeholder="Nombre de usuario" placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('name',value)}/>
            <Input_per animation='bounceInRight' keyboardType="default" placeholder="Contraseña" secureTextEntry={true} placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('password',value)}/>
            <Input_per animation='bounceInLeft' keyboardType="default" placeholder="Repita su contraseña" secureTextEntry={true} placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('password2',value)}/>
            <TouchableOpacity activeOpacity={0.6} onPress={checarDatos}>
                <Lineargra_per animation='bounceInUp' colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.login_btn_regist}>
                    <Text style={styles.texts_regist}>Registrarme</Text>
                </Lineargra_per>
            </TouchableOpacity>
        </LinearGradient>
        </>
    );
}