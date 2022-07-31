import { View, TouchableOpacity, ScrollView,Modal,TextInput,Text,ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import Styles from "./Styles";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "./database/firebase";
import { Entypo, FontAwesome5,Ionicons,MaterialIcons,FontAwesome} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import Publicacion from './Publicacion';
export default function Publicaciones({navigation}){
    const styles = Styles.styles;
    const db=firebase.db;
    const storage = firebase.firebase.storage();
    const auth = firebase.auth;
    var localstorage = new Storage ({
        size:1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache:true,
    });
    global.localStorage = localstorage;
    const [state,setState]=useState({
        menu_display:{display:'none'},
        newPost_display:true
    });
    function toggle_menu(){
        if(state.menu_display.display=='none'){
            setState({...state,menu_display:{display:'flex'}})
        }else{
            setState({...state,menu_display:{display:'none'}})
        }
    }
    const data =[{usuario:'Usuario',url_photo:'',descripcion:'Hola :3',img:''},{usuario:'Usuario',url_photo:'',descripcion:'El oeste de Texas divide la frontera entre S',img:''}]
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
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate('Perfil')}>
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
            <Modal animationType="slide" visible={state.newPost_display} transparent={true}>
                <View style={styles.newPost}>
                    <View style={styles.form_newpost}>
                        <View style={styles.header_newpost}>
                            <Text style={styles.texto_header_newpost}>Crear nueva publicación</Text>
                            <TextInput placeholder="Agrega una descripción..." style={styles.input_newpost}/>
                        </View>
                        <View style={styles.body_newpost}>
                            <ImageBackground style={styles.image_newpost}>

                            </ImageBackground>
                        </View>
                        <View style={styles.footer_newpost}>
                            <View style={[styles.contenedor_boton_menu,{flexDirection:'row'}]}>
                                <TouchableOpacity activeOpacity={0.6} onPress={()=>cerrarSesion()}>
                                    <View style={styles.button_menu_container}>
                                        <FontAwesome name="close" size={35} color="pink" />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.6}>
                                    <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={[styles.login_btn_regist,{marginTop:0}]}>
                                        <Text style={styles.texts_regist}>Publicar</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}