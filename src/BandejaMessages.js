import { View, Text, Image, ImageBackground,TextInput,StyleSheet,ScrollView, TouchableOpacity, Alert } from "react-native";
import CSS from './Styles';
import Messages from "./Message";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "./database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import { useState,useEffect } from "react";
export default function BandejaMessages({route,navigation}){
    var styles = CSS.styles;
    const db = firebase.db;
    const storage = firebase.firebase.storage();
    var localstorage = new Storage ({
        size:1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache:true,
    });
    global.localStorage = localstorage;
    const {uid,chatId}=route.params;
    const [state,setState]=useState({
        messages:[],
        message:''
    });
    const handleChangeText = (name,value)=>{
        setState({...state,[name]:value})
    }
    var messages =[
        {
            user:'Usuario1',
            message:'Mensaje saasassadsdas',
            hora:'10:20',
            tipo:'1'
        },
        {
            user:'usuario1',
            message:'Hola',
            hora:'10:20',
            tipo:'1'
        },
        {
            user:'Usuario2',
            message:'Mensaje saasassadsdas',
            hora:'10:20',
            tipo:'2'
        },
        {
            user:'usuario1',
            message:'Hola',
            hora:'10:20',
            tipo:'2'
        }
    ];
    useEffect(()=>{
        let abortController = new AbortController();
        readMessages();
        return ()=>{
            abortController.abort();
        }
    },[]);
    /*FIREBASE FUNCTIONS */
    const readMessages=async()=>{
        let user = '';
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            user = result.userKey;
            db.collection('chats').doc(chatId).onSnapshot((snapshot)=>{
                let array = snapshot.data().messages;
                let mensajes =[];
                for(var i in array){
                    let tipo_mensaje = 0;
                    if(array[i].user!=user){
                        tipo_mensaje=2;
                    }else{
                        tipo_mensaje=1;
                    }
                    let ms ={
                        hora:array[i].hora,
                        img:array[i].img,
                        message:array[i].message,
                        type:tipo_mensaje,
                        user:array[i].user
                    }
                    mensajes.push(ms);
                }
                setState({...state,messages:mensajes});
            },(error)=>{
                console.log(error.code+' '+error.message);
            })
        }).catch((error)=>{
            console.log(error);
        });
    }
    const sendMessage=async()=>{
        if(state.message!=''){
            var sfDocRef = db.collection('chats').doc(chatId);
            return db.runTransaction(async(transaction) => {
                return transaction.get(sfDocRef).then((sfDoc) => {
                    if (!sfDoc.exists) {
                        throw "El documento no existe!";
                    }else{
                        let array = state.messages;
                        let ms = {
                            hora:'00:00',
                            img:'',
                            message:state.message,
                            type:1,
                            user:uid
                        }
                        array.push(ms);
                        transaction.update(sfDocRef, { messages: array});
                    }
                });
            }).then(() => {
                console.log('mensaje enviado');
            }).catch((error) => {
                console.log('Ocurrió un error intentelo nuevamente más tarde: '+error.message);
            });
        }else{
            Alert.alert('Ups!','Parece que no puedes enviar un mensaje vacío. 👀');
        }
    }
    /*FIREBASE END */
    return(
        <>
            <View style={styles.contenedor_messages}>
                <ScrollView style={styles.scroll_messages}>
                    { 
                        state.messages.map((p)=>(
                            <TouchableOpacity activeOpacity={0.9}>
                                <Messages key={p.user} user={p.user} mensaje={p.message} tipo={p.type} hora={p.hora} img={p.img}/>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <View style={styles.contenedor_input_messa}>
                    <View style={styles.butons_input_message}>
                        <View style={styles.fondo_icon_target_message}>
                            <FontAwesome5 size={13} name='photo-video' color='white'/>
                        </View>
                    </View>
                    <TextInput placeholder="Escribe un mensaje..." style={styles.input_messages} multiline={true} onChangeText={(value)=>handleChangeText('message',value)}/>
                    <View style={styles.butons_input_message}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>sendMessage()}>
                            <View style={styles.send_btn_message}>
                                <FontAwesome5 size={25} name='angle-right' color='blue'/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.butons_input_message}>
                        <View style={styles.fondo_icon_target_message}>
                            <FontAwesome5 size={13} name='file' color='white'/>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}