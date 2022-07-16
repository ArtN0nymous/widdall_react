import { View, ImageBackground, Image, TextInput, TouchableOpacity,ActivityIndicator, Text,FlatList, Alert } from "react-native";
import firebase from "./database/firebase";
import Styles from "./Styles";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import { useState, useEffect } from "react";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
export default function Perfil({navigation}){
    const styles = Styles.styles;
    const db = firebase.db;
    const auth = firebase.auth;
    const storage = firebase.firebase.storage();
    var localstorage = new Storage ({
        size:1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache:true,
    });
    global.localStorage = localstorage;
    const portada = require('./img/sebas.jpg');
    const data = [
        {username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},
    ];
    var perfil = require('./img/default_profile.jpg');
    const [state,setState] = useState({
        profile:{
            displayName:'',
            email:'',
            url_photo:'',
            url_portada:''
        },
        uid:'',
        img : require('./img/default_profile.jpg'),
        open_display:{display:'none'},
        open_display_2:{display:'none'},
        name:'',
        link_image_profile:'',
        loading_state:{display:'none'},
        path:'',
        oper_display:'',
        cargando:{display:'none'}
    });
    const uiPicker=(oper)=>{
        switch(oper){
            case 'perfil':
                setState({...state,open_display:{display:'flex'},oper_display:'perfil'})
                break
            case 'portada':
                setState({...state,open_display_2:{display:'flex'},oper_display:'portada'})
                break;
        }
    }
    function cancel(){
        switch(state.oper_display){
            case 'perfil':
                setState({...state,open_display:{display:'none'}})
                break;
            case 'portada':
                setState({...state,open_display_2:{display:'none'}})
                break;
        }
    }
    function cerrar_update(){
        setState({...state,loading_state:{display:'none'}});
    }
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
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
        if(permissionResult.granted === false){
            cancel();
            alert('Permisos para usar la cámara requeridos !');
            return;
        }else{
            let pickerResult = await ImagePicker.launchCameraAsync();
            if(pickerResult.cancelled==true){
                return;
            }else{
                setState({...state,img:{uri:pickerResult.uri}, path:pickerResult.uri,open_display:{display:'none'}});
            }
        }
    }
    const handleChangeText = (name,value)=>{
        setState({...state,[name]:value})
    }
    useEffect(()=>{
        let abortController = new AbortController();
        loadProfile();
        return ()=>{
            abortController.abort();
        }
    },[]);
    const loadProfile=async()=>{
        let perfil = {};
        let uid = null; 
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            uid = result.userKey;
            db.collection('users').doc(uid).get().then((doc)=>{
                state.link_image_profile = doc.data().url_photo;
                if(doc.data().url_portada!=''){
                    perfil={
                        url_photo:{uri:doc.data().url_photo},
                        url_portada:{uri:doc.data().url_portada},
                        displayName:doc.data().displayName,
                        descripcion:doc.data().descripcion,
                        email:doc.data().email
                    }
                    setState({...state,profile:perfil});
                }else{
                    perfil={
                        url_photo:{uri:doc.data().url_photo},
                        url_portada:require('./img/sebas.jpg'),
                        displayName:doc.data().displayName,
                        descripcion:doc.data().descripcion,
                        email:doc.data().email
                    }
                    setState({...state,profile:perfil,img:{uri:doc.data().url_photo}});
                }
            }).catch((error)=>{
                Alert.alert('Aetnción','Ocurrió un error al recuperar los datos de usuario.');
            });
        }).catch((error)=>{
            Alert.alert('Atención','Ha ocurrido un error al verificar su usuario, será redirigido al login.',[{
                text:'Ok',
                onPress:()=>{navigation.push('Login');}
            }]);
        });
    }
    const formatData=(data,numColums)=>{
        const n_filas = Math.floor(data.length/numColums);

        let n_element_lastrow = data.length - (n_filas);
        
        return data;
    }
    function edit_perfil(){
        setState({...state,loading_state:{display:'flex'},oper_display:'perfil'});
    }
    function checarDatos(){
        var name = state.name;
        if(name!=''&&name!=null){
            if(name.length>4){
                updateUser();
            }else{
                Alert.alert('Atención','El nombre debe tener al menos 4 caracteres.');
            }
        }else{
            updateUser();
        }
    }
    /**--FIREBASE FUNCTION BEGIN--*/
    const updateUser = async()=>{
        /**PASO 1 TRAER USUARIO LOGEADO */
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            let uid = result.userKey;
            let path = state.path;
            saveImg(path,uid);
        }).catch((error)=>{
            console.log('ES AQUI AUI');
            Alert.alert('Atención','Ha ocurrido un error, por favor intentelo nuevamente más tarde.');
        });
    }
    const saveImg = async (path,user)=>{
        /**PASO 2 ACTUALIZAR IMAGEN DEL USUARIO */
        setState({...state,cargando:{display:'flex'}});
        console.log('el path trae esto: '+path);
        if(path!=''){
            let file = await fetch(path).then(r => r.blob());
            let array = path.split('/');
            let name = array[array.length-1];
            let profile = {};
            let portada = require('./img/sebas.jpg');   
            await storage.ref('Perfiles').child('Imagenes/'+name).put(file).then( async function(snapshot){
                await snapshot.ref.getDownloadURL().then(function(imgurl){
                    var url = imgurl;
                    switch(state.oper_display){
                        case 'perfil':
                            if(state.profile.url_portada!=portada){
                                profile = {
                                    displayName:state.profile.displayName,
                                    email:state.profile.email,
                                    url_photo:{uri:url},
                                    url_portada:{uri:state.profile.url_portada}
                                }
                            }else{
                                profile = {
                                    displayName:state.profile.displayName,
                                    email:state.profile.email,
                                    url_photo:{uri:url},
                                    url_portada:portada
                                }
                            }
                            setState({...state,profile:profile,img:{uri:state.url_photo}});
                            update(user,url);
                            break;
                        case 'portada':
                            profile = {
                                displayName:state.profile.displayName,
                                email:state.profile.email,
                                url_photo:{uri:state.profile.url_photo},
                                url_portada:{uri:url}
                            }
                            setState({...state,profile:profile,img:{uri:state.url_photo}});
                            update(user,url);
                            break;
                    }
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
    const update=async(uid,url)=>{
        if(state.oper_display=='portada'){
            await db.collection('users').doc(uid).update({
                url_portada:url
            }).then((result)=>{
                setState({
                    ...state,
                    cargando:{display:'none'},
                    open_display:{display:'none'},
                    open_display_2:{display:'none'},
                    loading_state:{display:'none'}
                });
            }).catch((error)=>{
                setState({...state,cargando:{display:'none'}});
                console.log('ES AQUI 2');
                Alert.alert('Atención','Ha ocurrido un error, por favor intentelo nuevamente más tarde.');
            });
        }else if(state.oper_display=='perfil'){
            if(state.name!=''&&url!=''){
                console.log(uid)
                await db.collection('users').doc(uid).update({
                    displayName:state.name,
                    url_photo:url
                }).then((result)=>{
                    setState({
                        ...state,
                        cargando:{display:'none'},
                        open_display:{display:'none'},
                        open_display_2:{display:'none'}
                    });
                }).catch((error)=>{
                    setState({...state,cargando:{display:'none'}});
                    console.log('ES AQUI 3');
                    console.log(error.code+' '+error.message);
                    Alert.alert('Atención','Ha ocurrido un error, por favor intentelo nuevamente más tarde.');
                });
            }else if(url!=''&&state.name==''){
                await db.collection('users').doc(uid).update({
                    url_photo:url
                }).then((result)=>{
                    setState({
                        ...state,
                        cargando:{display:'none'},
                        open_display:{display:'none'},
                        open_display_2:{display:'none'},
                        loading_state:{display:'none'}
                    });
                }).catch((error)=>{
                    setState({...state,cargando:{display:'none'}});
                    console.log('ES AQUI 4');
                    Alert.alert('Atención','Ha ocurrido un error, por favor intentelo nuevamente más tarde.');
                });
            }else if(state.name!=''&&url==''){
                await db.collection('users').doc(uid).update({
                    displayName:state.name
                }).then((result)=>{
                    setState({
                        ...state,
                        cargando:{display:'none'},
                        open_display:{display:'none'},
                        open_display_2:{display:'none'},
                        loading_state:{display:'none'}
                    });
                }).catch((error)=>{
                    console.log(error.code+' '+error.message);
                    alert('Ha ocurrido un error por favior intentelo de nuevo mas tarde');
                });
            }else{
                setState({...state,cargando:{display:'none'}});
                alert('NO has hecho ningun cambio aún :)');
            }
        }else{
            setState({...state,cargando:{display:'none'}});
            Alert.alert('Atención','Ha ocurrido un error inesperado.');
        }
    };
    /**--FIREBASE FUNCTION END-- */
    const numColums = 2;
    const renderItem = ({item,index})=>{
        return(
            <View style={styles.caja1_usu}>
                <View style={styles.contenido_caja_usu}>
                    <Image style={styles.icon_usu} source={item.url_photo}/>
                    <Text style={styles.limpiador_usu}>{item.username}</Text>
                    <Text style={styles.det_lim_usu}>{item.descripcion}</Text>
                </View>
            </View>
        );
    }
    const header = (
        <>
            <ImageBackground style={styles.circle_cont_usu} source={state.profile.url_portada}>
                <View style={styles.edit_portada}>
                    <TouchableOpacity onPress={()=>{uiPicker('portada')}}>
                        <FontAwesome size={25} name='pencil-square-o' color='white'/>
                    </TouchableOpacity>
                </View>
                <ImageBackground style={styles.circle_usu} source={state.profile.url_photo}>
                    <Text style={styles.text_1_usu}>{state.profile.displayName}</Text>
                    <Text style={styles.text_small_usu}>{state.profile.email}</Text>
                    <TouchableOpacity onPress={edit_perfil}>
                        <View style={styles.button_opt_usu}>
                            <Text style={styles.editar_perfil}>Editar perfil</Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </ImageBackground>
            <TextInput keyboardType="default" style={styles.input_buscar_usu} placeholder="Encontrar amigos..." placeholderTextColor={'purple'}/>
        </>
    );
    const footer = (
        <>
            <View style={styles.cont_target_b_usu}>
                <View style={styles.target_b}>
                    <View style={styles.target_cont_b_usu}>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.icon_target_b_cont_1_usu}>
                                <View style={styles.icon_target_b_usu}>
                                    <View style={styles.fondo_icon_target_b_usu}>
                                        <FontAwesome5 size={13} name='brush' color='white'/>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.row_b_usu}>
                                <View style={styles.det_atg_b_usu}>
                                    <Text style={styles.limpieza_b_usu}> Footer</Text>
                                    <Text style={styles.detalles_b_usu}>Realizar un análisis para liberar espacio de almacenamiento</Text>
                                </View>                                  
                            </View>
                            <View style={styles.icon_target_b_cont_2_usu}>
                                <View style={styles.icon_target_b_cont_1}>
                                    <FontAwesome5 size={25} name='angle-right' color='grey'/>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
    return(
        <>
            <FlatList ListHeaderComponent={header} ListFooterComponent={footer} style={{flex:1, flexDirection:'column',backgroundColor:'#EEF1F3'}} data={formatData(data,numColums)} renderItem={renderItem} numColumns={numColums}/>
            <View style={[styles.loading_contenedor,state.cargando,{zIndex:13}]}>
                <ActivityIndicator size={50} color='purple' animating={true} style={styles.loading}/>
                <Text style={styles.loading_text}>Cargando</Text>
            </View>
            <View style={[styles.loading_contenedor,state.loading_state]}>
                <View style={styles.ventana_modal}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>{uiPicker('perfil')}}>
                        <LinearGradient animation='bounceIn' colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.border_image_regist}>
                            <Image source={state.img} style={styles.img_regist}/>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TextInput  keyboardType="default" placeholder="Nombre de usuario" placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('name',value)} maxLength={30}/>
                    <View style={styles.buton_row_perfil}>
                        <TouchableOpacity activeOpacity={0.6} onPress={cerrar_update}>
                            <LinearGradient colors={['#D55C04', '#D03203', '#B51F02']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.btn_perfil_update}>
                                <Text style={styles.texts_regist}>Cancelar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} onPress={checarDatos}>
                            <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={[styles.btn_perfil_update,{marginLeft:10}]}>
                                <Text style={styles.texts_regist}>Actualizar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
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
            <View style={[styles.loading_contenedor,state.open_display_2,{zIndex:12}]}>
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
        </>
    );
}