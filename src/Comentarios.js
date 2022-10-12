import { View, Text,ImageBackground,TextInput,ScrollView, TouchableOpacity, Alert,Keyboard, ActivityIndicator } from "react-native";
import CSS from './Styles';
import { FontAwesome5,FontAwesome} from "@expo/vector-icons";
import firebase from "./database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import AnimatedLottieView from "lottie-react-native";
import { useState,useEffect,useRef } from "react";
export default function Comentarios({route,navigation}){
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
    const {postID}=route.params;
    const [text,setText]=useState("");
    const [coments,setComents]=useState([]);
    const scrollViewRef = useRef();
    const sendAnim = require('./assets/lottie/send.json');
    const animation= useRef(null);
    const [send,setSend]=useState(false);
    const [cargando,setCargando]=useState({display:'none'});
    useEffect(()=>{
        let abortController = new AbortController();
        leerComents();
        return ()=>{
            abortController.abort();
        }
    },[]);
    useEffect(()=>{
        if(send){
            animation.current.play(0,120);
        }
    },[send]);
    const sendComent=()=>{
        if(text!=''){
            let comentarios = coments;
            if(comentarios!=null&&comentarios!=undefined){
                localstorage.load({
                    key:'loginState'
                }).then((result)=>{
                    let user = result.userKey;
                    let comentario = {
                        comentario:text,
                        fecha:Date.now(),
                        user:user
                    }
                    comentarios.push(comentario);
                    setSend(true);
                    db.collection('post').doc(postID).update({
                        comentarios:comentarios
                    }).then((result)=>{
                        setText("");
                        //Keyboard.dismiss();
                        leerComents()
                    }).catch((err)=>{
                        console.log(err.message);
                    });
                }).catch((error)=>{
                    console.log(error.message);
                    alert('Error al recuperar la información del usuario.');
                });
            }else{
                console.log('Comentarios undefined.');
            }
        }else{
            Alert.alert('Ups!!','No puedes enviar un comentario vacío.');
        }
    }
    const leerComents=()=>{
        console.log(postID);
        db.collection('post').doc(postID).onSnapshot((result)=>{
            let comentarios = result.data().comentarios;
            let data = [];
            let newArray = [];
            try{
                if(comentarios.length>0){
                    console.log(comentarios);
                    comentarios.forEach((item,i)=>{
                        db.collection('users').doc(item.user).get().then((result)=>{
                            data.push({
                                comentario:item.comentario,
                                user:item.user,
                                url_photo:result.data().url_photo,
                                name:result.data().displayName,
                                fecha:item.fecha
                            });
                            if(comentarios.length==i+1){
                                newArray= data.sort((a, b) => new Date(a.fecha).getTime() < new Date(b.fecha).getTime());
                                setComents(newArray);
                            }
                        }).catch((err)=>{
                            console.log(err.message);
                        });
                    });
                }else{
                    console.log('No tiene comentarios');
                }
            }catch(err){
                console.log('No tiene comentarios');
            }
        },(error)=>{
            console.log(error.message);
        });
    }
    return(
        <View style={styles.contenedor_messages}>
            <ScrollView style={styles.scroll_messages} ref={scrollViewRef} onContentSizeChange={()=>scrollViewRef.current.scrollToEnd({animated:true})}>
                {
                    coments.map((item,i)=>{
                        let date = new Date(item.fecha);
                        let fulltime = date.toLocaleDateString();
            
                        if(item.comentario.length>74){
                            return(
                                <View style={[styles.contenedor_comentario_grande,{backgroundColor:'rgba(0,0,0,0)'}]} key={i}>
                                    <View style={styles.target_comentario}>
                                        <View style={styles.target_cont_b_usu}>
                                            <View style={{flexDirection:'row'}}>
                                                <View style={styles.icon_comment}>
                                                    <ImageBackground style={[styles.fondo_icon_target_b_usu,{backgroundColor:'orange'}]} source={{uri:item.url_photo}}/>
                                                </View>
                                                <View style={styles.row_comment}>
                                                    <View style={styles.contenedor_comentario}>
                                                        <Text style={styles.user_comment}>{item.name}</Text>
                                                        <Text style={styles.comment_text}>{item.comentario}</Text>
                                                        <Text style={styles.fecha_comment}>{fulltime}</Text>
                                                    </View>                                  
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            );
                        }else{
                            return(
                                <View style={[styles.cont_target_b_usu,{backgroundColor:'rgba(0,0,0,0)'}]} key={i}>
                                    <View style={styles.target_comentario}>
                                        <View style={styles.target_cont_b_usu}>
                                            <View style={{flexDirection:'row'}}>
                                                <View style={styles.icon_target_b_cont_1_usu}>
                                                    <ImageBackground style={[styles.fondo_icon_target_b_usu,{backgroundColor:'orange'}]} source={{uri:item.url_photo}}/>
                                                </View>
                                                <View style={styles.row_comment}>
                                                    <View style={styles.contenedor_comentario}>
                                                        <View style={styles.contenedor_header_coment}>
                                                            <Text style={styles.user_comment}>{item.name}</Text>
                                                            <Text>{fulltime}</Text>
                                                        </View>
                                                        <Text style={styles.comment_text}>{item.comentario}</Text>
                                                    </View>                                  
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            );
                        }
                    })
                }
            </ScrollView>
            <View style={{flexDirection:'column',alignItems:'center'}}>
                <View style={styles.contenedor_input_comment}>
                    <View style={styles.butons_input_message}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>Alert.alert('Ups','Parece que está función aun no está disponible :)')}>
                            <View style={styles.fondo_icon_target_message}>
                                <FontAwesome5 size={13} name='photo-video' color='white'/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <TextInput placeholder="Escribe un comentario..." style={styles.input_comment} multiline={true} onChangeText={(value)=>setText(value)} value={text}/>
                    </View>
                    <View style={styles.butons_input_message}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>sendComent()}>
                            <View style={styles.sendButton}>
                                <AnimatedLottieView ref={animation} source={sendAnim} style={styles.sendComent} autoPlay={false} loop={false}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={[styles.loading_contenedor,cargando,{zIndex:13}]}>
                <ActivityIndicator size={50} color='purple' animating={true} style={styles.loading}/>
                <Text style={styles.loading_text}>Cargando</Text>
            </View>
        </View>
    )
}