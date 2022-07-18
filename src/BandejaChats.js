import { LinearGradient } from "expo-linear-gradient";
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Chat from "./Chat";
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from "./database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import Styles from "./Styles";
import { Entypo, FontAwesome5,Ionicons } from '@expo/vector-icons'; 
export default function BandejaChats({navigation}){
    const img = require('./img/default_profile.jpg');
    const auth = firebase.auth;
    var localstorage = new Storage ({
        size:1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache:true,
    });
    global.localStorage = localstorage;
    const styles = Styles.styles;
    var chats = [
        {
            usuario:'Usuario',
            mensaje:'Ejemplo de mensaje',
            img:''
        }
    ];
    function toggle_menu(){
        if(state.menu_display.display=='none'){
            setState({...state,menu_display:{display:'flex'}})
        }else{
            setState({...state,menu_display:{display:'none'}})
        }
    }
    const cerrarSesion=async()=>{
        await auth.signOut().then(()=>{
            localstorage.remove({
                key:'loginState'
            }).then((resul)=>{
                navigation.push('Login');
            }).catch((error)=>{
                console.log(error);
            });
        }).catch((error)=>{
            alert('Ha ocurrido un error al intentar cerrar la sesión.');
            console.log(error.code+' '+error.message);
        });
    }
    return(
        <View style={styles.contenedor_general_chats}>
            <View style={styles.contenedor_chats}>
                <ScrollView>
                    { 
                        chats.map((p)=>(
                            <TouchableOpacity onPress={()=>navigation.push('Messages')} activeOpacity={0.6}>
                                <Chat key={p.usuario} usuario={p.usuario} mensaje={p.mensaje}/>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
            <View style={styles.contenedor_menu}>
                <View style={styles.contenedor_boton_menu}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>toggle_menu()}>
                        <View style={styles.button_menu_container}>
                            <Entypo name="menu" size={35} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.menu_content}>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>toggle_menu()}>
                            <View style={styles.button_menu_container}>
                                <Entypo name="menu" size={35} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6}>
                            <View style={styles.button_menu_container}>
                                <FontAwesome5 name="user-circle" size={35} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6}>
                            <View style={styles.button_menu_container}>
                                <Ionicons name="people-circle" size={35} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenedor_boton_menu}>
                        <TouchableOpacity activeOpacity={0.6}>
                            <View style={styles.button_menu_container}>
                                <Ionicons name="ios-log-out" size={35} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}