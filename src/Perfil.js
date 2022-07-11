import { View, ImageBackground, Image, TextInput, ScrollView } from "react-native";
import firebase from "./database/firebase";
import Styles from "./Styles";
import { useState, useEffect } from "react";
export default function Perfil({navigation}){
    const styles = Styles.styles;
    const db = firebase.db;
    const auth = firebase.auth;
    const portada = require('./img/sebas.jpg');
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
    return(
        <>
        <ScrollView>
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
        </ScrollView>
        </>
    );
}