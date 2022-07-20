import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image,Alert,TouchableOpacity,TextInput,Switch,ActivityIndicator, Button } from "react-native";
import { useState } from "react";
//import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import firebase from "../src/database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import CSS from './Styles';
import Funciones from "./Funciones";
export default function Registro({navigation}){
    // const Lineargra_per = Animatable.createAnimatableComponent(LinearGradient);
    // const Input_per = Animatable.createAnimatableComponent(TextInput);
    const db = firebase.db;
    const auth = firebase.auth;
    var styles = CSS.styles;
    const storage = firebase.firebase.storage();
    const App = Funciones.App;
    var localstorage = new Storage ({
        size:1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache:true,
    });
    global.localStorage = localstorage;
    const [state,setState] = useState({
        email:'',
        name:'',
        password:'',
        password2:'',
        descripcion:'',
        img : require('./img/default_profile.jpg'),
        path:null,
        loading:false,
        loading_display:{
            display:'none'
        },
        url_photo:'',
        open_display:{
            display:'none'
        }
    });

    const handleChangeText = (name,value)=>{
        setState({...state,[name]:value})
    }
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    function checarDatos(){
        /**PASO 1 REVISAR DATOS */
        if(state.path!=''&&state.path!=null){
            if(state.email!=""){
                let e = App.validarEmail(state.email);
                if(e!=false){
                    if(state.name!=""){
                        if(state.name.length>4){
                            if(state.password!=""){
                                if(state.password2!=""){
                                    if(state.descripcion!=""){
                                        let p = App.validadPass(state.password,state.password2);
                                        if(p!=false){
                                            setState({...state,loading_display:{
                                                display:'flex'
                                            }});
                                            saveUser();
                                        }else{
                                            Alert.alert('Atención','Verifique su contraseña, debe ser mayor a 10 caracteres o no coincide.');
                                        }
                                    }else{
                                        Alert.alert('Atención','La descripción no puede estar vacía.');
                                    }
                                }else{
                                    Alert.alert('Atención','Verifique su contraseña.');
                                }
                            }else{
                                Alert.alert('Atención','Su contraseña no puede estar vacía.');
                            }
                        }else{
                            Alert.alert('Atención','El nombre debe tener al menos 4 ceracteres.');
                        }
                    }else{
                        Alert.alert('Atención','Debe ingresar un nombre de usuario.');
                    }
                }else{
                    Alert.alert('Atención','Ingrese una direccion de correo valida.');
                }
            }else{
                Alert.alert('Atención','Su correo no puede estar vacío.');
            }
        }else{
            Alert.alert('Atención', 'debe seleccioanr una imagen de perfil.');
        }
    }
    const saveUser=async()=>{
        /**PASO 2 REGISTRAR USUARIO */
        await auth.createUserWithEmailAndPassword(state.email, state.password)
        .then((userCredential) => {
          const user = userCredential.user;
          saveImg(state.path,user);
          //guardar();
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
    const saveImg = async (path,user)=>{
        /**PASO 3 GUARDAR IMAGEN DEL USUARIO */
        let file = await fetch(path).then(r => r.blob());
        let array = path.split('/');
        let name = array[array.length-1];
        await storage.ref('Perfiles').child('Imagenes/'+name).put(file).then( async function(snapshot){
             await snapshot.ref.getDownloadURL().then(function(imgurl){
                var url = imgurl;
                setState({...state,url_photo:url});
                updateProfile(user,url);
            });
        }).catch((error)=>{
            console.log(error.code+' '+error.message);
            setState({...state,loading_display:{
                display:'none'
            }});
            alert("error: " + error.message);
        });
    }
    const updateProfile = async(user,url)=>{
        /**PASO 4 ACTUALIZAR PERFIL DEL USUARIO */
        await user.updateProfile({
        displayName: state.name,
        photoURL: url
        }).then(() => {
            addingUsu(user.uid,url,state.name);
        }).catch((error) => {
            setState({...state,loading_display:{
                display:'none'
            }});
            Alert.alert('Atención','Ha ocurrido un error!: '+error.message);
        }); 
    }
    function randomHexColor(){
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const addingUsu= async (uid,url,name) =>{
        /**PASO 5 GUARDAR USUARIO EN FIRESTORE */
        let color_portada = randomHexColor();
        await db.collection('users').doc(uid).set({
            url_photo:url,
            url_portada:'',
            color_portada:color_portada,
            chats:'',
            displayName:name,
            descripcion:state.descripcion,
            solicitudes:''
        }).then((result)=>{
            localstorage.save({
                key:'loginState',
                data:{
                    userName:name,
                    userKey:uid
                }
            });
            setState({...state,loading_display:{
                display:'none'
            }});
            navigation.goBack();
        }).catch((error)=>{
            setState({...state,loading_display:{
                display:'none'
            }});
            alert(error.code+' '+error.message);
        });
    }
    const uiPicker=()=>{
        setState({...state,open_display:{display:'flex'}})
    }
    function cancel(){
        setState({...state,open_display:{display:'none'}})
    }
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        /**VERIFICAR OPCIONES DE IMAGENES */
        let options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowEditing:true,
            //aspect:[4,3],
            quality:1
        }
        if (permissionResult.granted === false) {
            cancel();
          alert("Permission to access camera roll is required!");
          return;
        }else{
            let pickerResult = await ImagePicker.launchImageLibraryAsync();
            setState({...state,img:{uri:pickerResult.uri},path:pickerResult.uri, open_display:{display:'none'}});
        }
    }
    let openCamera = async ()=>{
        console.log('camera intent');
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if(permissionResult.granted === false){
            cancel();
            alert('Permisos para usar la cama´ra requeridos !');
            return;
        }else{
            let pickerResult = await ImagePicker.launchCameraAsync();
            console.log(pickerResult);
            setState({...state,img:{uri:pickerResult.uir}, path:pickerResult.uri,open_display:{display:'none'}});
        }
    }
    return(
        <>
        <LinearGradient style={styles.contenedor_regist} colors={['#0364A3','#0695F3','#68BFF7','#0364A3']}>
            <TouchableOpacity activeOpacity={0.6} onPress={uiPicker}>
                <LinearGradient animation='bounceIn' colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.border_image_regist}>
                    <Image source={state.img} style={styles.img_regist}/>
                </LinearGradient>
            </TouchableOpacity>
            <TextInput  keyboardType="email-address" placeholder="Correo" placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('email',value)}/>
            <TextInput  keyboardType="default" placeholder="Nombre de usuario" placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('name',value)} maxLength={15}/>
            <TextInput  keyboardType="default" placeholder="Agrega una breve descripción de ti..." placeholderTextColor={'#0B2379'} style={[styles.inputs_regist,{height:50}]} onChangeText={(value)=>handleChangeText('descripcion',value)} multiline={true} maxLength={100}/>
            <TextInput  keyboardType="default" placeholder="Contraseña" secureTextEntry={isEnabled?false:true} placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('password',value)} maxLength={30}/>
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
            <View style={[styles.loading_contenedor,state.open_display,{zIndex:9}]}>
                <View style={{ width:200,top:100, zIndex:10, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(255,255,255,0.2)', borderRadius:10}}>
                    <TouchableOpacity onPress={cancel}>
                        <View style={styles.btn_cancel_regist}>
                            <Text style={{color:'white', fontWeight:'bold'}}>X</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={openCamera}>
                        <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.open_btn_regist}>
                            <Text style={styles.texts_regist}>Cámara</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={openImagePickerAsync}>
                        <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.open_btn_regist}>
                            <Text style={styles.texts_regist}>Galería</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={checarDatos}>
                <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.login_btn_regist}>
                    <Text style={styles.texts_regist}>Registrarme</Text>
                </LinearGradient>
            </TouchableOpacity>
        </LinearGradient>
        </>
    );
}