import { LinearGradient } from "expo-linear-gradient";
import { View, TextInput, Text, Image,Switch, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import firebase from '../src/database/firebase';
import { useState, useEffect} from "react";
import { Alert } from "react-native";
import CSS from './Styles'
import Funciones from './Funciones';
export default function Login({navigation}){
    const db  = firebase.db;
    const auth = firebase.auth;
    const App = Funciones.App;
    var img  = require('./img/icon.png');
    var styles = CSS.styles;
    const [state,setState]= useState({
        email:'',
        password:'',
        loading_display:{
            display:'flex'
        }
    });
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const handleChangeText=(name,value)=>{
        setState({...state,[name]:value});
    }
    useEffect(
        ()=>verify_user_logedIn()
    );
    function verify_user_logedIn(){
        var user = auth.currentUser;
        if(user!=null){
            navigation.push('Chats');
        }else{
            console.log('Falta quitar loading :)');
            return;
        }
    }
    function checarDatos(){
        if(state.email!=""){
            if(state.password!=""){
                var valido = App.validarEmail(state.email);
                if(valido!=false){
                    loginIn(state.email,state.password);
                }else{
                    Alert.alert('Atención','Ingrese euna direccion de correo valida.');
                }
            }else{
                Alert.alert('Atención','Debe ingresar una contraseña.');
            }
        }else{
            Alert.alert('Atención','El correo no puede estar vacío.');
        }
    }
    const loginIn= async (email,password)=>{
        await auth.signInWithEmailAndPassword(email,password)
        .then((result)=>{
            Alert.alert('Bienvenido',result.user.uid, [
                {
                  text: "Aceptar",
                  onPress: navigation.push('Chats'),
                }
            ]);
        })
        .catch((error)=>{
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
                <TextInput placeholder="Password" placeholderTextColor={'#1C9AB9'} style={styles.inputs_login} secureTextEntry={isEnabled?false:true} onChangeText={(value)=>handleChangeText('password',value)}/>
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
                <Text style={{color:'white',fontSize:15,marginBottom:10}} onPress={()=>navigation.push('Registro')}>Registrarme ?</Text>
            </LinearGradient>
            <View style={[styles.loading_contenedor,state.loading_display]}>
                <ActivityIndicator size={50} color='purple' animating={true} style={styles.loading}/>
                <Text style={styles.loading_text}>Cargando</Text>
            </View>
        </View>
        </>
    );
}