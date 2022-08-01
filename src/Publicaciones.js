import { View, TouchableOpacity, ScrollView,Modal,TextInput,Text,ImageBackground, Alert } from "react-native";
import { useState, useEffect } from "react";
import Styles from "./Styles";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "./database/firebase";
import { Entypo, FontAwesome5,Ionicons,MaterialIcons,FontAwesome} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import Publicacion from './Publicacion';
import * as ImagePicker from 'expo-image-picker';
import Gallery from 'react-native-image-gallery';
export default function Publicaciones({navigation}){
    const styles = Styles.styles;
    const db=firebase.db;
    const storage = firebase.firebase.storage();
    const auth = firebase.auth;
    var localstorage = new Storage ({
        size:1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache:false,
    });
    global.localStorage = localstorage;
    const [state,setState]=useState({
        menu_display:{display:'none'},
        newPost_display:false,
        open_display:{display:'none'},
        display_gallery:{display:'none'},
        path:'',
        descripcion:'',
        img:'',
        img_gallery:''
    });
    function toggle_menu(){
        if(state.menu_display.display=='none'){
            setState({...state,menu_display:{display:'flex'}})
        }else{
            setState({...state,menu_display:{display:'none'}})
        }
    }
    const handleChangeText = (name,value)=>{
        setState({...state,[name]:value})
    }
    function cancelar(){
        setState({...state,newPost_display:false,path:'',img:{uri:''}});
    }
    function cancel(){
        setState({...state,open_display:{display:'none'}})
    }
    const dimiss=()=>{
        setState({...state,display_gallery:{display:'none'}});
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
          alert("Permission to access camera roll is required!");
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
            alert('Permisos para usar la cámara requeridos !');
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
    const data =[{usuario:'Usuario',url_photo:'',descripcion:'Hola :3',img:''},{usuario:'Usuario',url_photo:'',descripcion:'El oeste de Texas divide la frontera entre S',img:''}]
    function checarDatos(){
        if(state.path!=''&&state.descripcion!=''){
            publicar(state.path,state.descripcion);
        }else{
            Alert.alert('Ups!','Parece que no puedes hacer una publicación vacía 👀');
        }
    }
    function validImage(){
        let path = state.path;
        if(path!=''){
            setState({...state,display_gallery:{display:'flex'},img_gallery:path});
        }
    }
    /*FUNCIONES FIREBASE */
    const publicar = async()=>{
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            let uid = result.userKey;
            db.collection('publicaciones').doc(uid).get((doc)=>{
                let publicaciones = doc.data().publicaciones;
                let time = Date.now();
                
            }).catch((error)=>{
                console.log(error.code+' '+error.message);
            });
        }).catch((error)=>{
            console.log('Error al cargar el usuario');
        });
    }
    const cerrarSesion=async()=>{
        await auth.signOut().then(()=>{
            localstorage.remove({
                key:'loginState'
            }).then((resul)=>{
                localstorage.remove({
                    key:'usuarios'
                }).then((result)=>{
                    navigation.navigate('Login');
                });
            }).catch((error)=>{
                console.log(error);
            });
        }).catch((error)=>{
            alert('Ha ocurrido un error al intentar cerrar la sesión.');
            console.log(error.code+' '+error.message);
        });
    }
    /*FIREBASE END */
    return(
        <View style={styles.contenedor_publicaciones}>
            <View style={styles.contenedor_publicacion}>
                <ScrollView>
                    {
                        data.map((p,i)=>(
                            <Publicacion key={i} usuario={p.usuario} url_photo={p.url_photo} descrip={p.descripcion} img={p.img}/>
                        ))
                    }
                </ScrollView>
            </View>
            <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.contenedor_menu}>
                <View style={styles.contenedor_boton_menu}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>toggle_menu()}>
                        <View style={styles.button_menu_container}>
                            <Entypo name="menu" size={35} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.menu_content,state.menu_display]}>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>setState({...state,newPost_display:true})}>
                            <View style={styles.button_menu_container}>
                                <MaterialIcons name="add-box" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate('Perfil')}>
                            <View style={styles.button_menu_container}>
                                <FontAwesome5 name="user-circle" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate('Usuario')}>
                            <View style={styles.button_menu_container}>
                                <Ionicons name="people-circle" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate('Chats')}>
                            <View style={styles.button_menu_container}>
                                <Ionicons name="md-chatbubbles" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>cerrarSesion()}>
                            <View style={styles.button_menu_container}>
                                <Ionicons name="ios-log-out" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
            <Modal animationType="fade" visible={state.newPost_display} transparent={true}>
                <View style={styles.newPost}>
                    <View style={styles.form_newpost}>
                        <View style={styles.header_newpost}>
                            <Text style={styles.texto_header_newpost}>Crear nueva publicación</Text>
                            <TextInput placeholder="Agrega una descripción...(opcional)" maxLength={50} style={styles.input_newpost} onChangeText={(value)=>handleChangeText(value)}/>
                        </View>
                        <View style={styles.body_newpost}>
                            <View style={[styles.edit_portada,{zIndex:5}]}>
                                <TouchableOpacity onPress={()=>setState({...state,open_display:{display:'flex'}})}>
                                    <FontAwesome size={25} name='pencil-square-o' color='white'/>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.image_newpost} onPress={()=>validImage()}>
                                <ImageBackground style={styles.image_newpost} source={state.img}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.footer_newpost}>
                            <View style={[styles.contenedor_boton_menu,{flexDirection:'row'}]}>
                                <TouchableOpacity activeOpacity={0.6} onPress={()=>cancelar()}>
                                    <View style={styles.button_menu_container}>
                                        <FontAwesome name="close" size={35} color="pink" />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.6} onPress={()=>checarDatos()}>
                                    <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={[styles.login_btn_regist,{marginTop:0}]}>
                                        <Text style={styles.texts_regist}>Publicar</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
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
                <View style={[styles.loading_contenedor,state.display_gallery,{zIndex:12}]}>
                    <View style={{ flex:1, zIndex:10, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(255,255,255,0.2)', borderRadius:10}}>
                        <Gallery style={{flex:1,backgroundColor:'rgba(0,0,0,0.6)'}} images={[
                            {source:{uri:state.img_gallery}}
                        ]} onSingleTapConfirmed={()=>dimiss()}/>
                    </View>
                </View>
            </Modal>
        </View>
    );
}