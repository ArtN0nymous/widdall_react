import { View, Text,ScrollView, ImageBackground, FlatList, TextInput, Alert,Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import CSS from "./Styles";
import firebase from "./database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import { useEffect, useState } from "react";
export default function Usuarios({navigation}){
    const styles = CSS.styles;
    const db = firebase.db;
    const storage = firebase.firebase.storage();
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
        uid:''
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
    const leerUsuarios= async () =>{
        let usuarios = "";
        db.collection("users").onSnapshot((snapshot) => {
            let usuarios = [];
            snapshot.forEach((doc)=>{
                if(state.uid!=doc.id){
                    if(doc.data().url_portada!=''){
                        let user = {
                            username:doc.data().displayName,
                            url_photo:{uri:doc.data().url_photo},
                            url_portada:{uri:doc.data().url_portada},
                            descripcion:doc.data().descripcion
                        }
                        usuarios.push(user);
                    }else{
                        let user = {
                            username:doc.data().displayName,
                            url_photo:{uri:doc.data().url_photo},
                            url_portada:require('./img/sebas.jpg'),
                            descripcion:doc.data().descripcion
                        }
                        usuarios.push(user);
                    }
                }
            });
            setState({...state,usuarios:usuarios})
        }, (error) => {
            Alert.alert('Vaya', 'Parece que ha ocurrido un error inesperado.');
        });
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
                                    <Text style={styles.limpieza_b_usu}>HEADER</Text>
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
            <FlatList ListHeaderComponent={header} ListFooterComponent={footer} style={{flex:1, flexDirection:'column',backgroundColor:'#EEF1F3'}} data={formatData(state.usuarios,numColums)} renderItem={renderItem} numColumns={numColums}/>
        </>
    );
}