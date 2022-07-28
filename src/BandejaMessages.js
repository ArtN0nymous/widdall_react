import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, ImageBackground,TextInput,StyleSheet,ScrollView, TouchableOpacity, Alert,Keyboard, ActivityIndicator } from "react-native";
import CSS from './Styles';
import Messages from "./Message";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "./database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import { useState,useEffect,useRef } from "react";
export default function BandejaMessages({route,navigation}){
    var styles = CSS.styles;
    const db = firebase.db;
    const storage = firebase.firebase.storage();
    var localstorage = new Storage ({
        size:1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache:true,
    });
    var contador =0;
    global.localStorage = localstorage;
    const {uid,chatId}=route.params;
    const [state,setState]=useState({
        messages:[],
        message:'',
        contador:0,
        open_display:{display:'none'},
        img:'',
        path:'',
        cargando:{display:'none'}
    });
    const [text,setText]=useState("");
    const scrollViewRef = useRef();
    const handleChangeText = (name,value)=>{
        setState({...state,[name]:value})
        setText(value);
    }
    var messages =[
        {
            user:'Usuario1',
            message:'Mensaje saasassadsdas',
            hora:'10:20',
            tipo:'1'
        },
        {
            user:'usuario1',
            message:'Hola',
            hora:'10:20',
            tipo:'1'
        },
        {
            user:'Usuario2',
            message:'Mensaje saasassadsdas',
            hora:'10:20',
            tipo:'2'
        },
        {
            user:'usuario1',
            message:'Hola',
            hora:'10:20',
            tipo:'2'
        }
    ];
    useEffect(()=>{
        let abortController = new AbortController();
        readMessages();
        return ()=>{
            abortController.abort();
        }
    },[]);
    function sendMessageCheck(){
        if(state.img!=''){

        }else{
            sendMessage('');
        }
    }
    /*FIREBASE FUNCTIONS */
    const readMessages=async()=>{
        let user = '';
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            user = result.userKey;
            db.collection('chats').doc(chatId).onSnapshot((snapshot)=>{
                let array = snapshot.data().messages;
                let mensajes =[];
                for(var i in array){
                    let tipo_mensaje = 0;
                    if(array[i].user!=user){
                        tipo_mensaje=2;
                    }else{
                        tipo_mensaje=1;
                    }
                    let ms ={
                        hora:array[i].hora,
                        img:array[i].img,
                        message:array[i].message,
                        type:tipo_mensaje,
                        user:array[i].user
                    }
                    mensajes.push(ms);
                }
                setState({...state,messages:mensajes});
            },(error)=>{
                console.log(error.code+' '+error.message);
            })
        }).catch((error)=>{
            Alert.alert('Atención','Debes iniciar sesión',[{
                text:'Ok',
                onPress:()=>{navigation.push('Login');}
            }]);
        });
    }
    const sendMessage=async(img)=>{
        if(contador<1){
            contador +=1;
            if(state.message!=''&&contador==1){
                var sfDocRef = db.collection('chats').doc(chatId);
                return db.runTransaction(async(transaction) => {
                    return transaction.get(sfDocRef).then((sfDoc) => {
                        if (!sfDoc.exists) {
                            throw "El documento no existe!";
                        }else{
                            let array = state.messages;
                            let ms = {
                                hora:'00:00',
                                img:img,
                                message:state.message,
                                type:1,
                                user:uid
                            }
                            array.push(ms);
                            transaction.update(sfDocRef, { messages: array});
                            setText("");
                            Keyboard.dismiss();
                            contador=0;
                        }
                    });
                }).then(() => {
                    console.log('mensaje enviado');
                }).catch((error) => {
                    console.log('Ocurrió un error intentelo nuevamente más tarde: '+error.message);
                });
            }else{
                contador=0;
                Alert.alert('Ups!','Parece que no puedes enviar un mensaje vacío. 👀');
            }
        }
    }
    const saveImg = async ()=>{
        setState({...state,cargando:{display:'flex'}});
        let path = state.path;
        if(path!=''){
            let file = await fetch(path).then(r => r.blob());
            let array = path.split('/');
            let name = array[array.length-1];
            let profile = {};
            await storage.ref('Perfiles').child('Imagenes/'+name).put(file).then( async function(snapshot){
                await snapshot.ref.getDownloadURL().then(function(imgurl){
                    var url = imgurl;
                    sendMessage(url);
                });
            }).catch((error)=>{
                console.log(error.code+' '+error.message);
                setState({...state,cargando:{display:'none'}});
                alert("error: " + error.message);
            });
        }else{
            update(user,'');
        }
    }
    /*FIREBASE END */
    function cancel(){
        setState({...state,open_display:{display:'none'}});
    }
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        let options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowEditing:true,
            aspect:[4,3],
            quality:0.8
        }
        if (permissionResult.granted === false) {
            cancel();
          alert("Se necesitan permisos para acceder a la galería!");
          return;
        }else{
            let pickerResult = await ImagePicker.launchImageLibraryAsync();
            if(pickerResult.cancelled==true){
                return;
            }else{
                setState({...state,img:{uri:pickerResult.uri},path:pickerResult.uri, open_display:{display:'none'}});
            }
        }
    }
    let openCamera = async ()=>{
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        let options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowEditing:true,
            aspect:[4,3],
            quality:0.8,
            saveToPhotos:true
        }
        if(permissionResult.granted === false){
            cancel();
            alert('Se necesitan permisos para usar la cámara !');
            return;
        }else{
            let pickerResult = await ImagePicker.launchCameraAsync(options);
            if(pickerResult.cancelled==true){
                return;
            }else{
                setState({...state,img:{uri:pickerResult.uri},path:pickerResult.uri, open_display:{display:'none'}});
            }
        }
    }
    return(
        <>
            <View style={styles.contenedor_messages}>
                <ScrollView style={styles.scroll_messages} ref={scrollViewRef} onContentSizeChange={()=>scrollViewRef.current.scrollToEnd({animated:true})}>
                    { 
                        state.messages.map((p)=>(
                            <TouchableOpacity activeOpacity={0.9}>
                                <Messages key={p.user} user={p.user} mensaje={p.message} tipo={p.type} hora={p.hora} img={p.img}/>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <ImageBackground style={{width:100,height:100,backgroundColor:'gray',borderRadius:20,justifyContent:'center',alignItems:'center',display:'none'}}>
                        <Text style={{fontSize:40}}>X</Text>
                    </ImageBackground>
                    <View style={styles.contenedor_input_messa}>
                        <View style={styles.butons_input_message}>
                            <View style={styles.fondo_icon_target_message}>
                                <FontAwesome5 size={13} name='photo-video' color='white'/>
                            </View>
                        </View>
                        <View style={{flexDirection:'column'}}>
                            <TextInput placeholder="Escribe un mensaje..." style={styles.input_messages} multiline={true} onChangeText={(value)=>handleChangeText('message',value)} value={text}/>
                        </View>
                        <View style={styles.butons_input_message}>
                            <TouchableOpacity activeOpacity={0.6} onPress={()=>sendMessageCheck()}>
                                <View style={styles.send_btn_message}>
                                    <FontAwesome5 size={25} name='angle-right' color='blue'/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.butons_input_message}>
                            <View style={styles.fondo_icon_target_message}>
                                <FontAwesome5 size={13} name='file' color='white'/>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.loading_contenedor,state.cargando,{zIndex:13}]}>
                    <ActivityIndicator size={50} color='purple' animating={true} style={styles.loading}/>
                    <Text style={styles.loading_text}>Cargando</Text>
                </View>
                <View style={[styles.loading_contenedor,state.open_display,{zIndex:12}]}>
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
            </View>
        </>
    );
}