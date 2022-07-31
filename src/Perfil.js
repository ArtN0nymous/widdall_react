import { View, ImageBackground, Image, TextInput, TouchableOpacity,ActivityIndicator, Text,FlatList, Alert } from "react-native";
import firebase from "./database/firebase";
import Styles from "./Styles";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import { useState, useEffect } from "react";
import { FontAwesome5, FontAwesome,Ionicons,AntDesign } from "@expo/vector-icons";
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
            url_portada:'',
            color_portada:'',
            descripcion:''
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
        cargando:{display:'none'},
        user_id:'',
        friends:[],
        display_preview:{display:'none'},
        amigo:(<></>),
        profile_amigo:{
            displayName:'',
            url_photo:'',
            url_portada:'',
            color_portada:''
        }
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
                if(state.oper_display=='portada'){
                    console.log(pickerResult.uri);
                    localstorage.load({
                        key:'loginState'
                    }).then((result)=>{
                        let uid = result.userKey;
                        setState({...state,path:pickerResult.uri, open_display_2:{display:'none'},cargando:{display:'flex'}});
                        saveImg(pickerResult.uri,uid);
                    }).catch((error)=>{
                        console.log(error.code+' '+error.message);
                    });
                }else{
                    setState({...state,img:{uri:pickerResult.uri},path:pickerResult.uri, open_display:{display:'none'}});
                }
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
                if(state.oper_display=='portada'){
                    console.log(pickerResult.uri);
                    localstorage.load({
                        key:'loginState'
                    }).then((result)=>{
                        let uid = result.userKey;
                        setState({...state,path:pickerResult.uri, open_display_2:{display:'none'},cargando:{display:'flex'}});
                        saveImg(pickerResult.uri,uid);
                    }).catch((error)=>{
                        console.log(error.code+' '+error.message);
                    });
                }else{
                    setState({...state,img:{uri:pickerResult.uri},path:pickerResult.uri, open_display:{display:'none'}});
                }
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
                perfil={
                    url_photo:{uri:doc.data().url_photo},
                    url_portada:{uri:doc.data().url_portada},
                    color_portada:doc.data().color_portada,
                    displayName:doc.data().displayName,
                    descripcion:doc.data().descripcion,
                    email:doc.data().email
                }
                leerAmigos(perfil,doc.data().url_photo,uid);
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
            if(name.length>=4){
                updateUser();
            }else{
                Alert.alert('Atención','Tu descripción debe tener al menos 4 caracteres.');
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
            Alert.alert('Atención','Debes iniciar sesión',[{
                text:'Ok',
                onPress:()=>{navigation.push('Login');}
            }]);
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
                                    url_portada:{uri:state.profile.url_portada},
                                    color_portada:state.profile.color_portada
                                }
                            }else{
                                profile = {
                                    displayName:state.profile.displayName,
                                    email:state.profile.email,
                                    url_photo:{uri:url},
                                    url_portada:portada,
                                    color_portada:state.profile.color_portada
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
                                url_portada:{uri:url},
                                color_portada:state.profile.color_portada
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
                loadProfile();
            }).catch((error)=>{
                setState({...state,cargando:{display:'none'}});
                console.log('ES AQUI 2');
                Alert.alert('Atención','Ha ocurrido un error, por favor intentelo nuevamente más tarde.');
            });
        }else if(state.oper_display=='perfil'){
            if(state.name!=''&&url!=''){
                await db.collection('users').doc(uid).update({
                    descripcion:state.name,
                    url_photo:url
                }).then((result)=>{
                    setState({
                        ...state,
                        cargando:{display:'none'},
                        open_display:{display:'none'},
                        open_display_2:{display:'none'},
                        loading_state:{display:'none'},
                        loa
                    });
                    loadProfile();
                    Alert.alert('Genial !!','Tu perfil se ha actualizado 😎');
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
                    loadProfile();
                    Alert.alert('Genial !!','Tu foto de perfil se ha actualizado ⭐');
                }).catch((error)=>{
                    setState({...state,cargando:{display:'none'}});
                    console.log('ES AQUI 4');
                    Alert.alert('Atención','Ha ocurrido un error, por favor intentelo nuevamente más tarde.');
                });
            }else if(state.name!=''&&url==''){
                await db.collection('users').doc(uid).update({
                    descripcion:state.name
                }).then((result)=>{
                    loadProfile();
                    Alert.alert('Genial !!','Tu descripción se ha actualizado 😁');
                }).catch((error)=>{
                    console.log(error.code+' '+error.message);
                    alert('Ha ocurrido un error por favior intentelo de nuevo mas tarde');
                });
            }else{
                setState({...state,cargando:{display:'none'}});
                Alert.alert('Atención','NO has hecho ningun cambio aún :)');
            }
        }else{
            setState({...state,cargando:{display:'none'}});
            Alert.alert('Atención','Ha ocurrido un error inesperado.');
        }
    };
    const leerAmigos=async(perfil,img,uid)=>{
        localstorage.load({
            key:'usuarios'
        }).then((result)=>{
           let usuarios = result;
           setState({...state,profile:perfil,img:{uri:img},user_id:uid,friends:usuarios,cargando:{display:'none'},
           open_display:{display:'none'},
           open_display_2:{display:'none'},
           loading_state:{display:'none'}});
        }).catch((error)=>{
            console.log(error);
        })
    }
    const chatAmigo=(chat,uid)=>{
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            let user = result.userKey;
            if(chat!=''){
                setState({...state,display_preview:{display:'none'}});
                navigation.push('Messages',{uid:uid,chatId:chat});
            }else{
                setState({...state,cargando:{display:'flex'}});
                crearChat(uid,user);
            }
        }).catch((error)=>{
            Alert.alert('Atención','Debes iniciar sesión',[{
                text:'Ok',
                onPress:()=>{navigation.push('Login');}
            }]);
        });
    }
    const crearChat=async(uid,user)=>{
        let messages = [];
        let ms = {
            user:uid,
            message:'Hola',
            hora:'00:00',
            type:1,
            img:''

        }
        messages.push(ms);
        db.collection('chats').doc(uid+':'+user).set({
            messages:messages
        }).then((result)=>{
            db.collection('users').doc(user).get().then((doc)=>{
                let chats = doc.data().chats;
                if(chats!=''){
                    chats+=','+uid+':'+user;
                }else{
                    chats=uid+':'+user;
                }
                db.collection('users').doc(user).update({
                    chats:chats
                }).then((result)=>{
                    db.collection('users').doc(uid).get().then((doc)=>{
                        let chats = doc.data().chats;
                        if(chats!=''){
                            chats+=','+uid+':'+user;
                        }else{
                            chats=uid+':'+user;
                        }
                        db.collection('users').doc(uid).update({
                            chats:chats
                        }).then((result)=>{
                            setState({...state,cargando:{display:'none'}});
                            navigation.push('Messages',{uid:uid,chatId:uid+':'+user})
                        }).catch((error)=>{
                            console.log(error.code+' '+error.message);
                        })
                    }).catch((error)=>{
                        console.log(error.code+' '+error.message);
                    });
                }).catch((error)=>{
                    console.log(error.code+' '+error.message);
                })
            }).catch((error)=>{
                console.log(error.code+' '+error.message);
            });
        }).catch((error)=>{
            console.log(error.code+' '+error.message);
        });
    }
    const delFriend=async(uid)=>{
        if(uid!=''){
            localstorage.load({
                key:'loginState'
            }).then((result)=>{
                db.collection('users').doc(result.userKey).get().then((doc)=>{
                    let amigos = doc.data().friends;
                    console.log('amigos antes: '+amigos);
                    let array = amigos.split(',');
                    for(var i in array){
                        if(array[i]==uid){
                            array.splice(i,1);
                        }
                    }
                    amigos = array.join();
                    console.log('amigos despues: '+amigos);
                    db.collection('users').doc(result.userKey).update({
                        friends:amigos
                    }).then((result)=>{
                        loadProfile();
                        alert('Amigo eliminado');
                    }).catch((error)=>{
                        console.log(error.code+' '+error.message);
                    });
                }).catch((error)=>{
                    console.log(error.code+' '+error.message);
                });
            }).catch((error=>{
                Alert.alert('Atención','Debes iniciar sesión',[{
                    text:'Ok',
                    onPress:()=>{navigation.push('Login');}
                }]);
                console.log(error.message);
            }));
        }else{
            console.log('error');
        }
    }
    /**--FIREBASE FUNCTION END-- */
    function display_preview(){
        if(state.display_preview.display=='flex'){
            setState({...state,display_preview:{display:'none'}});
        }else{
            setState({...state,display_preview:{display:'flex'}});
        }
    }
    const previewUser=async(uid,name,url_photo,url_portada,descripcion,color,amigo,chats)=>{
        if(chats!=''){
            localstorage.load({
                key:'loginState'
            }).then((result)=>{
                let user = result.userKey;
                let array= chats.split(',');
                let chat = '';
                for(var i in array){
                    let array_2 = array[i].split(':');
                    for(var j in array_2){
                        if(array_2[j]==user){
                            chat=array[i];
                        }
                    }
                }
                setState({...state,display_preview:{
                    display:'flex'
                    },profile_amigo:{
                        uid:uid,
                        displayName:name,
                        url_photo:url_photo,
                        url_portada:url_portada,
                        descripcion:descripcion,
                        color_portada:color
                    },amigo:(
                        <>
                            <View style={styles.contenedor_boton_menu}>
                                <TouchableOpacity activeOpacity={0.6} onPress={()=>chatAmigo(chat,uid)}>
                                    <View style={styles.button_menu_container}>
                                        <AntDesign name="message1" size={35} color="skyblue"/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.contenedor_boton_menu}>
                                <TouchableOpacity activeOpacity={0.6}>
                                    <View style={styles.button_menu_container}>
                                        <AntDesign name="star" size={35} color="gold" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.contenedor_boton_menu_del}>
                                <TouchableOpacity activeOpacity={0.6} onPress={()=>delFriend(uid)}>
                                    <View style={styles.button_menu_container}>
                                        <AntDesign name="deleteuser" size={35} color="#B3022E"/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </>)});
            }).catch((error)=>{
                Alert.alert('Atención','Debes iniciar sesión',[{
                    text:'Ok',
                    onPress:()=>{navigation.push('Login');}
                }]);
            });
        }else{
            setState({...state,display_preview:{
                display:'flex'
            },profile_amigo:{
                uid:uid,
                displayName:name,
                url_photo:url_photo,
                url_portada:url_portada,
                descripcion:descripcion,
                color_portada:color
            },amigo:(
                <>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>chatAmigo('',uid)}>
                            <View style={styles.button_menu_container}>
                                <AntDesign name="message1" size={35} color="skyblue"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6}>
                            <View style={styles.button_menu_container}>
                                <AntDesign name="star" size={35} color="gold" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu_del}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>delFriend(uid)}>
                            <View style={styles.button_menu_container}>
                                <AntDesign name="deleteuser" size={35} color="#B3022E"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>)});
        }
    }
    const checkSearch=(value)=>{
        let longitud = value.length;
        console.log('longitud actual: '+value.length);
        if(longitud>0){
            searchFunction(value);
        }else{
            localstorage.load({
                key:'usuarios'
            }).then((result)=>{
                setState({...state,friends:result});
            }).catch((error)=>{
                alert(error.message);
            });
        }
    }
    const searchFunction = (value) => {
        localstorage.load({
            key:'usuarios'
        }).then((result)=>{
            let text = value;
            const updatedData = result.filter((item) => {
                const item_data = `${item.username.toUpperCase()})`;
                const text_data = text.toUpperCase();
                return item_data.indexOf(text_data) > -1;
            });
            setState({...state,friends: updatedData});
        }).catch((error)=>{
            console.log('Ha ocurrido un error inesperado, intentalo de nuevo más tarde.');
        })
    }
    const numColums = 3;
    const renderItem = ({item,index})=>{
        if(item.url_portada.uri!=''){
            if(item.amigo!=false){
                return(
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>previewUser(item.uid,item.username,item.url_photo,item.url_portada,item.descripcion,item.color_portada,item.amigo,item.chats)}>
                        <ImageBackground style={styles.target_usuarios}  source={item.url_portada}>
                            <View style={styles.contenido_caja_usu}>
                                <ImageBackground style={styles.icon_usu} source={item.url_photo}/>
                                <Text style={[styles.limpiador_usu,{backgroundColor:'rgba(255,255,255,0.15)',borderRadius:40}]}>{item.username}</Text>
                                <Text style={[styles.det_lim_usu,{backgroundColor:'rgba(255,255,255,0.15)',borderRadius:40}]}>{item.descripcion}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                );
            }else{
                return(
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>previewUser(item.uid,item.username,item.url_photo,item.url_portada,item.descripcion,item.color_portada,item.amigo,item.chats)} style={{display:'none'}}>
                        <ImageBackground style={styles.target_usuarios}  source={item.url_portada}>
                            <View style={styles.contenido_caja_usu}>
                                <ImageBackground style={styles.icon_usu} source={item.url_photo}/>
                                <Text style={[styles.limpiador_usu,{backgroundColor:'rgba(255,255,255,0.15)',borderRadius:40}]}>{item.username}</Text>
                                <Text style={[styles.det_lim_usu,{backgroundColor:'rgba(255,255,255,0.15)',borderRadius:40}]}>{item.descripcion}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                );
            }
        }else{
            if(item.amigo!=false){
                return(
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>previewUser(item.uid,item.username,item.url_photo,item.url_portada,item.descripcion,item.color_portada,item.amigo,item.chats)}>
                        <View style={[styles.target_usuarios,{backgroundColor:item.color_portada}]}>
                            <View style={styles.contenido_caja_usu}>
                                <Image style={styles.icon_usu} source={item.url_photo}/>
                                <Text style={[styles.limpiador_usu,{backgroundColor:'rgba(255,255,255,0.15)',borderRadius:40}]}>{item.username}</Text>
                                <Text style={[styles.det_lim_usu,{backgroundColor:'rgba(255,255,255,0.15)',borderRadius:40}]}>{item.descripcion}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }else{
                return(
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>previewUser(item.uid,item.username,item.url_photo,item.url_portada,item.descripcion,item.color_portada,item.amigo,item.chats)} style={{display:'none'}}>
                        <View style={[styles.target_usuarios,{backgroundColor:item.color_portada}]}>
                            <View style={styles.contenido_caja_usu}>
                                <Image style={styles.icon_usu} source={item.url_photo}/>
                                <Text style={[styles.limpiador_usu,{backgroundColor:'rgba(255,255,255,0.15)',borderRadius:40}]}>{item.username}</Text>
                                <Text style={[styles.det_lim_usu,{backgroundColor:'rgba(255,255,255,0.15)',borderRadius:40}]}>{item.descripcion}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }
        }
    }
    const header = (
        <>
            <ImageBackground style={[styles.circle_cont_usu,{backgroundColor:state.profile.color_portada}]} source={state.profile.url_portada}>
                <View style={styles.edit_portada}>
                    <TouchableOpacity onPress={()=>{uiPicker('portada')}}>
                        <FontAwesome size={25} name='pencil-square-o' color='white'/>
                    </TouchableOpacity>
                </View>
                <View style={{alignSelf:'flex-start',left:10}}>
                    <ImageBackground style={styles.circle_usu} source={state.profile.url_photo}>
                    </ImageBackground>
                    <Text style={styles.text_1_usu}>{state.profile.displayName}</Text>
                    <Text style={styles.text_small_usu}>{state.profile.email}</Text>
                    <Text style={styles.text_small_usu}>{state.profile.descripcion}</Text>
                    <TouchableOpacity onPress={edit_perfil}>
                        <View style={styles.button_opt_usu}>
                            <Text style={styles.editar_perfil}>Editar perfil</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={styles.search_bar}>
                <TextInput keyboardType="default" style={styles.input_buscar_usu} placeholder="Mis amigos..." placeholderTextColor={'purple'} onChangeText={(value)=>checkSearch(value)}/>
                <TouchableOpacity activeOpacity={0.6}>
                    <View style={styles.buton_search}>
                        <FontAwesome5 size={15} name='search' color='white'/>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
    const footer = (
        <>
            {/* <View style={styles.cont_target_b_usu}>
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
            </View> */}
        </>
    );
    return(
        <>
            <FlatList ListHeaderComponent={header} ListFooterComponent={footer} style={{flex:1, flexDirection:'column',backgroundColor:'#EEF1F3'}} data={formatData(state.friends,numColums)} renderItem={renderItem} numColumns={numColums}/>
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
                    <TextInput  keyboardType="default" placeholder="Cambiar mi descripción..." placeholderTextColor={'#0B2379'} style={styles.inputs_regist} onChangeText={(value)=>handleChangeText('name',value)} maxLength={30}/>
                    <View style={styles.buton_row_perfil}>
                        <TouchableOpacity activeOpacity={0.6} onPress={cerrar_update}>
                            <LinearGradient colors={['#D55C04', '#D03203', '#B51F02']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.btn_perfil_update}>
                                <Text style={styles.texts_regist}>Cerrar</Text>
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
            <ImageBackground style={[styles.contenedor_preview,state.display_preview,{backgroundColor:state.profile_amigo.color_portada}]} source={state.profile_amigo.url_portada}>
                <TouchableOpacity onPress={()=>display_preview()}>
                    <View style={[styles.btn_cancel_regist, styles.cancel_preview]}>
                        <Text style={{color:'white', fontWeight:'bold'}}>X</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.content_preview}>
                    <ImageBackground source={state.profile_amigo.url_photo} style={styles.image_preview}/>
                    <View style={styles.options_preview}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{alignSelf:'center',fontSize:17,fontWeight:'bold'}}>{state.profile_amigo.displayName}</Text>
                            <View style={styles.options_preview_b}>
                                {state.amigo}
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </>
    );
}