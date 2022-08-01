import { LinearGradient } from "expo-linear-gradient";
import { View, TextInput, Text, Image,Switch, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import firebase from '../src/database/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import { useState, useEffect} from "react";
import { Alert } from "react-native";
import CSS from './Styles'
import Funciones from './Funciones';
export default function Login({navigation}){
    const db  = firebase.db;
    const auth = firebase.auth;
    const App = Funciones.App;
    var localstorage = new Storage ({
        size:1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache:true,
    });
    global.localStorage = localstorage;
    var img  = require('./img/icon.png');
    var styles = CSS.styles;
    const [state,setState]= useState({
        password:'',
        loading_display:{
            display:'none'
        },
        loginState:''
    });
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');
    const hasUnsavedChanges = Boolean(state.loginState);
    useEffect(()=>{
        let abortController = new AbortController();
        verify_user_logedIn();
        navigation.addListener('beforeRemove', (e) => {
            if(state.loginState==''){
                console.log('Entra aqui');
                e.preventDefault();   
            }else{
                navigation.dispatch(e.data.action);
            }
        });
        return ()=>{
            abortController.abort();
        }
    });
    function verify_user_logedIn(){
        var user = '';
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            user = result.userKey;
            if(user!=''){
                setState({...state,loginState:result});
            }
        }).catch((err)=>{
            console.log(err.message);
        });
    }
    function checarDatos(){
        console.log(email+pass);
        if(email!=""){
            if(pass!=""){
                var valido = App.validarEmail(email);
                if(valido!=false){
                    loginIn(email,pass);
                }else{
                    Alert.alert('Atención','Ingrese una direccion de correo valida.');
                }
            }else{
                Alert.alert('Atención','Debe ingresar una contraseña.');
            }
        }else{
            Alert.alert('Atención','El correo no puede estar vacío.');
        }
    }
    const loginIn= async (email,password)=>{
        setState({...state,loading_display:{display:'flex'}});
        auth.setPersistence(firebase.firebase.auth.Auth.Persistence.LOCAL).then(()=>{
            return auth.signInWithEmailAndPassword(email,password)
            .then((result)=>{
                let uid = result.user.uid;
                let name = result.user.displayName;
                try{
                    localstorage.save({
                        key:'loginState',
                        data:{
                            userName:name,
                            userKey:uid,
                            verified:result.user.emailVerified
                        }
                    });
                    setState({...state,loginState:'1'});
                    if(result.user.emailVerified!=false){
                        Alert.alert('Bienvenido a Widdall',result.user.displayName, [
                            {
                            text: "Aceptar",
                            onPress: ()=>navigation.navigate('Publicaciones')
                            }
                        ]);
                    }else{
                        Alert.alert('Atención','Debes verificar tu usuario, enviamos un correo electrónico a la dirección: ⭐ '+auth.currentUser.email+' ⭐');
                    }
                }catch(e){
                    setState({...state,loading_display:{display:'none'}});
                    alert(e);
                }
            })
            .catch((error)=>{
                setState({...state,loading_display:{display:'none'}});
                switch(error.code){
                    case 'auth/user-not-found':
                        Alert.alert('Atención','Parece que este usuario no existe!');
                        break;
                    case 'auth/wrong-password':
                        Alert.alert('Atención', 'Usuario o contraseña incorrecta.');
                        break;
                    case 'auth/too-many-requests':
                        Alert.alert('Atención','El acceso a esta cuenta ha sido bloqueado temporalmente por demasiados intentos fallidos, puedes intentar reestablecer tu contraseña.');
                        break;
                }
                console.log(error.code +' '+error.message);
            });
        }).catch((err)=>{
            console.log(err.code+' '+err.message);
        });
    }
    return(
        <>
        <View style={styles.contenerdor_login}>
            <LinearGradient colors={['#0364A3','#0695F3','#68BFF7','#0364A3']} style={styles.form_login}>
                <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                style={styles.border_image_login}>
                    <Image source={img} style={styles.imagen_login}/>
                </LinearGradient>
                <TextInput placeholder="Usuario" placeholderTextColor={'#1C9AB9'} autoFocus={true} keyboardType='email-address' style={styles.inputs_login} onChangeText={(value)=>setEmail(value)}/>
                <TextInput placeholder="Password" placeholderTextColor={'#1C9AB9'} style={styles.inputs_login} secureTextEntry={isEnabled?false:true} onChangeText={(value)=>setPass(value)}/>
                <View style={styles.contenedor_switch}>
                    <Text style={styles.texto_switch}>Mostrar contraseña:</Text>
                    <Switch
                    trackColor={{ false: "purple", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "purple" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    />
                </View>
                <TouchableOpacity activeOpacity={0.6} onPress={checarDatos}>
                    <View  style={styles.boton_login}>
                        <View style={{justifyContent:'center', alignItems:'center', height:40}}>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Iniciar sesión</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.push('Registro')}>
                    <Text style={{color:'white',fontSize:15,marginBottom:10}}>Registrarme ?</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={[styles.loading_contenedor,state.loading_display]}>
                <ActivityIndicator size={50} color='purple' animating={true} style={styles.loading}/>
                <Text style={styles.loading_text}>Cargando</Text>
            </View>
        </View>
        </>
    );
}