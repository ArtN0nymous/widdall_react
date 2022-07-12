import { View, ImageBackground, Image, TextInput, ScrollView, Text,FlatList } from "react-native";
import firebase from "./database/firebase";
import Styles from "./Styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import { useState, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
export default function Perfil({navigation}){
    const styles = Styles.styles;
    const db = firebase.db;
    const auth = firebase.auth;
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
        uid:''
    });
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
                if(doc.data().url_portada!=''){
                    perfil={
                        url_photo:doc.data().url_photo,
                        url_portada:doc.data().url_portada,
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
                    setState({...state,profile:perfil});
                    console.log(state.profile);
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
                <ImageBackground style={styles.circle_usu} source={state.profile.url_photo}>
                    <Text style={styles.text_1_usu}>{state.profile.displayName}</Text>
                    <Text style={styles.text_small_usu}>{state.profile.email}</Text>
                    <View style={styles.button_opt_usu}>
                        <Text style={styles.optimizar_usu}>Cambiar foto</Text>
                    </View>
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
        </>
    );
}