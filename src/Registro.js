import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image,Alert,TouchableOpacity,TextInput,Switch,ActivityIndicator } from "react-native";
import { useState } from "react";
//import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import firebase from "../src/database/firebase";
import CSS from './Styles';
import Funciones from "./Funciones";
export default function({navigation}){
    // const Lineargra_per = Animatable.createAnimatableComponent(LinearGradient);
    // const Input_per = Animatable.createAnimatableComponent(TextInput);
    const db = firebase.db;
    const auth = firebase.auth;
    const storage = firebase.Storage;
    var styles = CSS.styles;
    const App = Funciones.App;
    const [state,setState] = useState({
        email:'',
        name:'',
        password:'',
        password2:'',
        img : require('./img/default_profile.jpg'),
        loading:false,
        loading_display:{
            display:'none'
        }
    });

    const handleChangeText = (name,value)=>{
        setState({...state,[name]:value})
    }
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    function checarDatos(){
        var result = App.newUser(state.email,state.name,state.password,state.password2);
        setState({...state,loading_display:{
            display:'flex'
        }});
        if(result.estado!=false){
            saveUser();
        }else{
            setState({...state,loading_display:{
                display:'none'
            }});
            Alert.alert(result.dato,result.message);
        }
    }
    const guardar= async () =>{
        await db.collection('users').add({
            email:state.email,
            usuario:state.name,
            url_photo:''
        }).then((result)=>{
            setState({...state,loading_display:{
                display:'none'
            }});
            navigation.push('Login');
        }).catch((err)=>{
            setState({...state,loading_display:{
                display:'none'
            }});
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
          setState({...state,loading_display:{
            display:'none'
            }});
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
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
        setState({...state,img:{uri:pickerResult.uri}});
        //saveImg();
    }
    const saveImg = async ()=>{
        let storageRef = storage.ref('Perfiles');
        await storageRef.child('Imagenes/'+'1').put(state.img).then(function(snapshot){
            snapshot.ref.getDownloadURL().then(function(imgurl){
                url = imgurl;
                console.log(url);
            });
        }).catch((error)=>{
            console.log(error.code+' '+error.message);
            alert("error: " + error.message);
        });
    }
    return(
        <>
        <LinearGradient style={styles.contenedor_regist} colors={['#0364A3','#0695F3','#68BFF7','#0364A3']}>
            <TouchableOpacity activeOpacity={0.6} onPress={openImagePickerAsync}>
                <LinearGradient animation='bounceIn' colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.border_image_regist}>
                    <Image source={state.img} style={styles.img_regist}/>
                </LinearGradient>
            </TouchableOpacity>
            <TextInput  keyboardType="email-address" placeholder="Correo" placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('email',value)}/>
            <TextInput  keyboardType="default" placeholder="Nombre de usuario" placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('name',value)}/>
            <TextInput  keyboardType="default" placeholder="Contraseña" secureTextEntry={isEnabled?false:true} placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('password',value)}/>
            <TextInput  keyboardType="default" placeholder="Repita su contraseña" secureTextEntry={isEnabled?false:true} placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('password2',value)}/>
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
            <View style={[styles.loading_contenedor,state.loading_display]}>
                <ActivityIndicator size={50} color='purple' animating={true} style={styles.loading}/>
                <Text style={styles.loading_text}>Cargando</Text>
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={checarDatos}>
                <LinearGradient animation='bounceInUp' colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.login_btn_regist}>
                    <Text style={styles.texts_regist}>Registrarme</Text>
                </LinearGradient>
            </TouchableOpacity>
        </LinearGradient>
        </>
    );
}