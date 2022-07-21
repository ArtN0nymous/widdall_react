import { View, Text,ScrollView, ImageBackground, FlatList, TextInput, Alert,Image,TouchableOpacity} from "react-native";
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
        }).catch((error)=>{
            navigation.push('Login');
        })
        db.collection("users").onSnapshot((snapshot) => {
            let usuarios = [];
            let amigos = '';
            db.collection('users').doc(id).get().then((result)=>{
                amigos = result.data().friends;
                amigos = amigos.split(',');
                snapshot.forEach((doc)=>{
                    if(state.uid!=doc.id){
                        let user = {
                            uid:doc.id,
                            username:doc.data().displayName,
                            url_photo:{uri:doc.data().url_photo},
                            url_portada:{uri:doc.data().url_portada},
                            color_portada:doc.data().color_portada,
                            descripcion:doc.data().descripcion,
                            amigo:false
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
    }
    const addFriend = async (uid)=>{
        console.log(uid);
        let uid_user = '';
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            uid_user=result.userKey;
            let friends = '';
            if(uid_user!=''){
                /*db.collection('users').doc(uid_user).get().then((doc)=>{
                    friends=doc.data().friends;
                    if(friends!=""){
                        friends+=','+uid;
                    }else{
                        friends=uid;
                    }
                    db.collection('users').doc(uid_user).update({
                        friends:friends
                    }).then((result)=>{
                        setState({...state,display_preview:{display:'none'}});
                    }).catch((error)=>{
                        Alert.alert('Atención','Parece que no ha podido ser agragado a tus amigos.');
                    });
                }).catch((error)=>{
                    console.log(error.code+' '+error.message);
                });*/
                db.collection('users').doc(uid).get().then((doc)=>{
                    let solicitudes = doc.data().solicitudes;
                    if(solicitudes!=''){
                        solicitudes=uid+','+solicitudes;
                    }else{
                        solicitudes=uid;
                    }
                    db.collection('users').doc(uid).update({
                        solicitudes:solicitudes
                    }).then((result)=>{
                        Alert.alert('Atención','Solicitud enviada',[
                            { text: "OK", onPress: () => cerrarPreview() }
                          ]);
                    }).catch((error)=>{
                        console.log('No se ha agregado la solicitud.');
                    })
                }).catch((error)=>{
                    console.log('NO se encontró el documento para este usuario');
                });
            }else{
                console.log('Error al cargar el id del usuario');
            }
        }).catch((error)=>{
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
                    console.log('No tienes solicitudes');
                }
            }).catch((error)=>{ 
                console.log(error.code+' '+error.message);
            });
        }).catch((error)=>{
            console.log('ERROR AL CARGAR LOGINSTATE');
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
                    alert('Solicitud eliminada');
                }).catch((error)=>{
                    console.log(error.code+' '+error.message);
                });
            }).catch((error)=>{
                console.log(error.code+' '+error.message);
            });
        }).catch((error)=>{
            navigation.push('Login');
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
    const previewUser=async(uid,name,url_photo,url_portada,descripcion,color,amigo)=>{
        if(amigo==true){
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
                        <TouchableOpacity activeOpacity={0.6}>
                            <View style={styles.button_menu_container}>
                                <AntDesign name="star" size={35} color="gold" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu_del}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>delFriend(state.profile.uid)}>
                            <View style={styles.button_menu_container}>
                                <AntDesign name="deleteuser" size={35} color="#B3022E"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>)});
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
                </>)});
        }
    }
    const numColums = 2;
    const renderItem = ({item,index})=>{
        if(item.url_portada.uri!=''){
            return(
                <TouchableOpacity activeOpacity={0.6} onPress={()=>previewUser(item.uid,item.username,item.url_photo,item.url_portada,item.descripcion,item.color_portada,item.amigo)}>
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
                <TouchableOpacity activeOpacity={0.6} onPress={()=>previewUser(item.uid,item.username,item.url_photo,item.url_portada,item.descripcion,item.color_portada,item.amigo)}>
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
                                                <View style={[styles.icon_target_b_cont_1,{backgroundColor:'rgba(29,207,16,0.3)',borderRadius:100}]}>
                                                    <Foundation size={28} name='check' color='green'/>
                                                </View>
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
                                <View style={styles.contenedor_boton_menu}>
                                    <TouchableOpacity activeOpacity={0.6}>
                                        <View style={styles.button_menu_container}>
                                            <Ionicons name="people-circle" size={35} color="white" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {state.amigo}
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </>
    );
}