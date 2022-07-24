import { View, Text,ScrollView, ImageBackground, FlatList, TextInput, Alert,Image,TouchableOpacity, ActivityIndicator} from "react-native";
import { SearchBar } from "react-native-screens";
import { AntDesign, FontAwesome5,Ionicons,Foundation } from '@expo/vector-icons'; 
import CSS from "./Styles";
import firebase from "./database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
export default function Usuarios({navigation}){
    const styles = CSS.styles;
    const db = firebase.db;
    var users = null;
    var localstorage = new Storage ({
        size:1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache:true,
    });
    global.localStorage = localstorage;
    const auth = firebase.get_auth;
    const data = [
        {username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},
    ];
    const [state,setState]=useState({
        usuarios:[],
        uid:'',
        searchValue:'',
        contador:0,
        img:require('./img/default_profile.jpg'),
        display_preview:{display:'none'},
        loading_display:{display:'none'},
        profile:{
            uid:'',
            name:'',
            url_photo:'',
            url_portada:'',
            descripcion:'',
            color_portada:'white'
        },
        amigos:'',
        amigo:(
        <>
            <View style={styles.contenedor_boton_menu}>
                <TouchableOpacity activeOpacity={0.6}>
                    <View style={styles.button_menu_container}>
                        <AntDesign name="star" size={35} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.contenedor_boton_menu}>
                <TouchableOpacity activeOpacity={0.6} onPress={()=>addFriend(state.profile.uid)}>
                    <View style={styles.button_menu_container}>
                        <Ionicons name="person-add-sharp" size={35} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </>),
        solicitudes_profiles:[]
    });
    useEffect(()=>{
        let abortController = new AbortController();
        leerUsuarios();
        return ()=>{
            abortController.abort();
        }
    },[]);
    const formatData=(data,numColums)=>{
        const n_filas = Math.floor(data.length/numColums);

        let n_element_lastrow = data.length - (n_filas);
        
        return data;
    }
    function cerrarPreview(){
        setState({...state,display_preview:{display:'none'}});
    }
    /*FIREBASE FUNCTIONS */
    const leerUsuarios= async () =>{
        let id = '';
        await localstorage.load({
            key:'loginState'
        }).then((result)=>{
            id= result.userKey;
            db.collection("users").onSnapshot((snapshot) => {
                let usuarios = [];
                let amigos = '';
                db.collection('users').doc(id).get().then((result)=>{
                    amigos = result.data().friends;
                    amigos = amigos.split(',');
                    snapshot.forEach((doc)=>{
                        if(id!=doc.id){
                            let user = {
                                uid:doc.id,
                                username:doc.data().displayName,
                                url_photo:{uri:doc.data().url_photo},
                                url_portada:{uri:doc.data().url_portada},
                                color_portada:doc.data().color_portada,
                                descripcion:doc.data().descripcion,
                                amigo:false,
                                chats:doc.data().chats
                            }
                            amigos.forEach(element => {
                                if(element==user.uid){
                                    user.amigo=true;
                                }
                            });
                            usuarios.push(user);
                        }
                    });
                    try{
                        localstorage.save({
                            key:'usuarios',
                            data:usuarios
                        });
                        leerSolicitudes(usuarios);
                    }catch(e){
                        alert(e.message);
                    }
                    //setState({...state,usuarios:usuarios});
                }).catch((error)=>{
                    console.log(error.code+' '+error.message);
                });
            }, (error) => {
                Alert.alert('Vaya', 'Parece que ha ocurrido un error inesperado.');
            });
        }).catch((error)=>{
            Alert.alert('Atención','Debes iniciar sesión.',[{
                text:'Ok',
                onPress:()=>{navigation.push('Login');}
            }]);
        })
    }
    const addFriend = async (uid)=>{
        let uid_user = '';
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            uid_user=result.userKey;
            if(uid_user!=''){
                db.collection('users').doc(uid).get().then((doc)=>{
                    let solicitudes = doc.data().solicitudes;
                    let exist = false;
                    if(solicitudes!=''){
                        let array = solicitudes.split(',');
                        for(var i in array){
                            if(array[i]==uid_user){
                                exist = true;
                                break;
                            }
                        }
                        if(exist!=true){
                            solicitudes=uid_user+','+solicitudes;
                            db.collection('users').doc(uid).update({
                                solicitudes:solicitudes
                            }).then((result)=>{
                                Alert.alert('Atención','Solicitud enviada',[
                                    { text: "OK", onPress: () => cerrarPreview() }
                                  ]);
                            }).catch((error)=>{
                                console.log('No se ha agregado la solicitud.');
                            });
                        }else{
                            Alert.alert('Atención','Ya has enviado una solicitud a esta persona.');
                            return;
                        }
                    }else{
                        solicitudes=uid_user;
                    }
                }).catch((error)=>{
                    console.log('NO se encontró el documento para este usuario');
                });
            }else{
                console.log('Error al cargar el id del usuario');
            }
        }).catch((error)=>{
            Alert.alert('Atención','Debes iniciar sesión',[{
                text:'Ok',
                onPress:()=>{navigation.push('Login');}
            }]);
            console.log(error);
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
                        leerUsuarios();
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
    const leerSolicitudes=async(usuarios)=>{
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            db.collection('users').doc(result.userKey).get().then((doc)=>{
                let solicitudes = doc.data().solicitudes;
                if(solicitudes!=''){
                    let solicitudes_profiles = [];
                    let array = solicitudes.split(',');
                    usuarios.forEach(element => {
                        for(var i in array){
                            if(element.uid==array[i]){
                                solicitudes_profiles.push(element);
                            }
                        }
                    });
                    setState({...state,usuarios:usuarios,solicitudes_profiles:solicitudes_profiles});
                }else{
                    setState({...state,usuarios:usuarios});
                    console.log('No tienes solicitudes');
                }
            }).catch((error)=>{ 
                console.log(error.code+' '+error.message);
            });
        }).catch((error)=>{
            Alert.alert('Atención','Debes iniciar sesión',[{
                text:'Ok',
                onPress:()=>{navigation.push('Login');}
            }]);
        });
    }
    const delSolicitud=async(uid)=>{
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            db.collection('users').doc(result.userKey).get().then((doc)=>{
                let solicitudes = doc.data().solicitudes;
                let array = solicitudes.split(',');
                for(var i in array){
                    if(array[i]==uid){
                        array.splice(i,1);
                    }
                }
                db.collection('users').doc(result.userKey).update({
                    solicitudes:array.join()
                }).then((res)=>{
                    Alert.alert('Vaya :/','Solicitud de amistad eliminada');
                }).catch((error)=>{
                    console.log(error.code+' '+error.message);
                });
            }).catch((error)=>{
                console.log(error.code+' '+error.message);
            });
        }).catch((error)=>{
            Alert.alert('Atención','Debes iniciar sesión',[{
                text:'Ok',
                onPress:()=>{navigation.push('Login');}
            }]);
        });
    }
    const aceptSolicitud=async(uid)=>{
        setState({...state,loading_display:{display:'flex'}});
        console.log('comenzamos');
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            var user = result.userKey;
            db.collection('users').doc(user).get().then((doc)=>{
                console.log('paso 1');
                let friends=doc.data().friends;
                if(friends!=""){
                    friends+=','+uid;
                }else{
                    friends=uid;
                }
                db.collection('users').doc(user).update({
                    friends:friends
                }).then((result)=>{
                    db.collection('users').doc(uid).get().then((doc)=>{
                        console.log('paso 2');
                        let friends_2 = doc.data().friends;
                        let nombre = doc.data().displayName;
                        if(friends_2!=''){
                            friends_2+=','+user;
                        }else{
                            friends_2=user;
                        }
                        db.collection('users').doc(uid).update({
                            friends:friends_2
                        }).then((result)=>{ 
                            db.collection('users').doc(user).get().then((doc)=>{
                                console.log('paso 3');
                                let solicitudes = doc.data().solicitudes;
                                let array = solicitudes.split(',');
                                for(var i in array){
                                    if(array[i]==uid){
                                        array.splice(i,1);
                                    }
                                }
                                db.collection('users').doc(user).update({
                                    solicitudes:array.join()
                                }).then((res)=>{
                                    setState({...state,loading_display:{display:'none'}});
                                    Alert.alert('Genial 😁',`Tú y ⭐ ${nombre} ⭐ ahora son amigos. Dile Hola !!!`,[
                                        {
                                          text: "Tal vez luego",
                                          onPress: () => leerUsuarios(),
                                          style: "cancel"
                                        },
                                        { text: "OK", onPress: () => chatAmigo('',uid) }
                                      ])
                                }).catch((error)=>{
                                    setState({...state,loading_display:{display:'none'}});
                                    console.log(error.code+' '+error.message);
                                });
                            }).catch((error)=>{
                                setState({...state,loading_display:{display:'none'}});
                                console.log(error.code+' '+error.message);
                            });
                        }).catch((error)=>{
                            setState({...state,loading_display:{display:'none'}});
                            console.log(error.code+' '+error.message);
                        });
                    }).catch((error)=>{
                        setState({...state,loading_display:{display:'none'}});
                        console.log(error.code+' '+error.message);
                    });
                }).catch((error)=>{
                    setState({...state,loading_display:{display:'none'}});
                    console.log(error.code+' '+error.message);
                });
            }).catch((error)=>{
                setState({...state,loading_display:{display:'none'}});
                console.log(error.code+' '+error.message);
            });
        }).catch((error)=>{
            Alert.alert('Atención','Debes iniciar sesión',[{
                text:'Ok',
                onPress:()=>{navigation.push('Login');}
            }]);
        });
    }
    const chatAmigo=(chat,uid)=>{
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            let user = result.userKey;
            if(chat!=''){
                navigation.push('Messages',{uid:uid,chatId:chat});
                setState({...state,display_preview:{display:'none'}});
            }else{
                setState({...state,loading_display:{display:'flex'},display_preview:{display:'none'}});
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
                            setState({...state,loading_display:{display:'none'}});
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
    /*FIREBASE FUNCTION END */
    const handleChangeText = (name,value)=>{
        setState({...state,[name]:value})
    }
    function display_preview(){
        if(state.display_preview.display=='flex'){
            setState({...state,display_preview:{display:'none'}});
        }else{
            setState({...state,display_preview:{display:'flex'}});
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
            setState({...state,usuarios: updatedData,searchValue:value});
        }).catch((error)=>{
            console.log('Ha ocurrido un error inesperado, intentalo de nuevo más tarde.');
        })
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
                setState({...state,usuarios:result});
            }).catch((error)=>{
                alert(error.message);
            });
        }
    }
    function chatNoamigo(){
        Alert.alert('Ups', 'Creo que primero deben ser amigos para poder charlar 👀.');
    }
    const previewUser=async(uid,name,url_photo,url_portada,descripcion,color,amigo,chats)=>{
        if(amigo==true){
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
                    },profile:{
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
        }else if(amigo==false){
            setState({...state,display_preview:{
                display:'flex'
            },profile:{
                uid:uid,
                name:name,
                url_photo:url_photo,
                url_portada:url_portada,
                descripcion:descripcion,
                color_portada:color
            },amigo:(
                <>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>chatNoamigo()}>
                            <View style={styles.button_menu_container}>
                                <AntDesign name="message1" size={35} color="white"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6}>
                            <View style={styles.button_menu_container}>
                                <AntDesign name="star" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>addFriend(uid)}>
                            <View style={styles.button_menu_container}>
                                <Ionicons name="person-add-sharp" size={35} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </>)});
        }
    }
    const numColums = 2;
    const renderItem = ({item,index})=>{
        if(item.url_portada.uri!=''){
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
        }
    }
    const header = (
        <>
        <LinearGradient colors={['#0364A3','#0695F3','#68BFF7','#0364A3']}>
            <Text style={styles.texto_solicitudes}>Solicitudes</Text>
            <ScrollView style={styles.scrollview_solicitudes}>
                { 
                    state.solicitudes_profiles.map((p)=>(
                        <View style={[styles.cont_target_b_usu,{backgroundColor:'rgba(0,0,0,0)'}]}>
                            <View style={styles.target_b}>
                                <View style={styles.target_cont_b_usu}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={styles.icon_target_b_cont_1_usu}>
                                            <ImageBackground style={[styles.fondo_icon_target_b_usu,{backgroundColor:'orange'}]} source={p.url_photo}/>
                                        </View>
                                        <View style={styles.row_b_usu}>
                                            <View style={styles.det_atg_b_usu}>
                                                <Text style={styles.limpieza_b_usu}>{p.username}</Text>
                                                <Text style={styles.detalles_b_usu}>{p.descripcion}</Text>
                                            </View>                                  
                                        </View>
                                        <View style={styles.icon_target_b_cont_2_usu}>
                                            <View style={styles.options_solicitudes}>
                                                <TouchableOpacity onPress={()=>delSolicitud(p.uid)}>
                                                    <View style={styles.icon_target_b_cont_1}>
                                                        <Foundation size={28} name='x' color='grey'/>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity activeOpacity={0.6} onPress={()=>aceptSolicitud(p.uid)}>
                                                    <View style={[styles.icon_target_b_cont_1,{backgroundColor:'rgba(29,207,16,0.3)',borderRadius:100}]}>
                                                        <Foundation size={28} name='check' color='green'/>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        </LinearGradient>
            <View style={styles.search_bar}>
                <TextInput keyboardType="default" style={styles.input_buscar_usu} placeholder="Encontrar amigos..." placeholderTextColor={'purple'} onChangeText={(value)=>checkSearch(value)}/>
                <TouchableOpacity onPress={()=>leerSolicitudes()} activeOpacity={0.6}>
                    <View style={styles.buton_search}>
                        <FontAwesome5 size={15} name='search' color='white'/>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
    const footer = (
        <>
            
        </>
    );
    return(
        <>
            <FlatList ListHeaderComponent={header} ListFooterComponent={footer} style={{flex:1, flexDirection:'column',backgroundColor:'#EEF1F3'}} data={formatData(state.usuarios,numColums)} renderItem={renderItem} numColumns={numColums}/>
            <ImageBackground style={[styles.contenedor_preview,state.display_preview,{backgroundColor:state.profile.color_portada}]} source={state.profile.url_portada}>
                <TouchableOpacity onPress={()=>display_preview()}>
                    <View style={[styles.btn_cancel_regist, styles.cancel_preview]}>
                        <Text style={{color:'white', fontWeight:'bold'}}>X</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.content_preview}>
                    <ImageBackground source={state.profile.url_photo} style={styles.image_preview}/>
                    <View style={styles.options_preview}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{alignSelf:'center',fontSize:17,fontWeight:'bold'}}>{state.profile.name}</Text>
                            <View style={styles.options_preview_b}>
                                {state.amigo}
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <View style={[styles.loading_contenedor,state.loading_display]}>
                <ActivityIndicator size={50} color='purple' animating={true} style={styles.loading}/>
                <Text style={styles.loading_text}>Cargando</Text>
            </View>
        </>
    );
}