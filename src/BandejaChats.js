import { LinearGradient } from "expo-linear-gradient";
import { View, ScrollView, Text, Image, RefreshControl, TouchableOpacity,ActivityIndicator,ImageBackground,Alert } from "react-native";
import Chat from "./Chat";
import {useState,useEffect,useCallback,useRef} from 'react';
import firebase from "./database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import Styles from "./Styles";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { NavigationEvents } from 'react-navigation';
import { Entypo, FontAwesome5,Ionicons } from '@expo/vector-icons'; 
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
export default function BandejaChats({navigation}){
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);
      async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            sound:'notification.wav',
          });
        }
      
        return token;
      }
      async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Tal vez tienes mensajes nuevos",
            body: 'Revisa tu bandeja de chats :3',
            data: { data: 'holoakjadj,' },
            sound:'notification.wav'
          },
          trigger: { seconds: 1 },
        });
      }
    const img = require('./img/default_profile.jpg');
    const auth = firebase.auth;
    const db = firebase.db;
    var localstorage = new Storage ({
        size:1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache:true,
    });
    global.localStorage = localstorage;
    const styles = Styles.styles;
    const [state,setState]=useState({
        menu_display:{display:'none'},
        chats:[],
        loading_display:{display:'none'},
        refreshing:false
    });
    useEffect(()=>{
        let abortController = new AbortController();
        loadProfile();
        leerUsuarios();
        return ()=>{
            abortController.abort();
        }
    },[]);
    const loadProfile=async()=>{
        localstorage.load({
            key:'loginState'
        }).then((result)=>{
            if(result.verified!=true){
                Alert.alert('Atención','Debes verificar tu usuario, enviamos un correo electrónico a la dirección: ⭐ '+auth.currentUser.email+' ⭐');
                navigation.navigate('Login');
            }else{
                leerChats(result.userKey);
            }
        }).catch((error)=>{
            Alert.alert('Atención','Debes iniciar sesión',[{
                text:'Ok',
                onPress:()=>{navigation.push('Login');}
            }]);
        });
    }
    /**Controles para actualizar scrollview al deslizar */
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadProfile().then(() => setRefreshing(false));
      }, []);
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
                navigation.navigate('Login');
            }).catch((error)=>{
                console.log(error);
            });
        }).catch((error)=>{
            alert('Ha ocurrido un error al intentar cerrar la sesión.');
            console.log(error.code+' '+error.message);
        });
    }
    /*FIREBASE FUNCTIONS */ 
    const leerChats=async(user)=>{
        setState({...state,loading_display:{display:'flex'}});
        db.collection('chats').onSnapshot((snapshot)=>{
            schedulePushNotification();
            let chats = [];
            snapshot.forEach((doc) => {
                if(doc){
                    let chatId = doc.id;
                    let array = chatId.split(':');
                    let messages = doc.data().messages;
                    let lastText = messages[messages.length-1].message;
                    if(lastText.length>20){
                        lastText = lastText.substring(0, 19)+'...';
                    }
                    let lastUser =messages[messages.length-1].user;
                    for(var i in array){
                        if(array[i]==user){
                            array.splice(i,1);
                            db.collection('users').doc(array[0]).get().then((resul)=>{
                                localstorage.load({
                                    key:'loginState'
                                }).then((result)=>{
                                    if(lastUser!=result.userKey){
                                        lastUser=result.userName;
                                    }else{
                                        lastUser=resul.data().displayName;
                                    }
                                    let chat ={
                                        userName:resul.data().displayName,
                                        url_photo:{uri:resul.data().url_photo},
                                        uid:resul.id,
                                        idchat:doc.id,
                                        color_portada:resul.data().color_portada,
                                        lastMessage:lastUser+': '+lastText
                                    }
                                    chats.push(chat);
                                    asignarChats(chats);
                                }).catch((error)=>{
                                    console.log('Error al cargar los datos de usuario.');
                                });
                            }).catch((error)=>{
                                console.log(error.code+' '+error.message);
                            });
                        }
                    }
                }else{
                    setState({...state,loading_display:{display:'none'}});
                    console.log('No hay chats');
                }
            });
            setState({...state,loading_display:{display:'none'}});
        },(error) => {
            setState({...state,loading_display:{display:'none'}});
            console.log(error.code+' '+error.message);
        });
    }
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
                    if(amigos!=''){
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
                        }catch(e){
                            alert(e.message);
                        }
                    }else{
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
                                usuarios.push(user);
                            }
                        });
                        try{
                            localstorage.save({
                                key:'usuarios',
                                data:usuarios
                            });
                        }catch(e){
                            alert(e.message);
                        }
                    }
                    //setState({...state,usuarios:usuarios});
                }).catch((error)=>{
                    setState({...state,loading_display:{display:'none'}});
                    console.log(error.code+' '+error.message);
                });
            }, (error) => {
                setState({...state,loading_display:{display:'none'}});
                Alert.alert('Vaya', 'Parece que ha ocurrido un error inesperado.');
            });
        }).catch((error)=>{
            setState({...state,loading_display:{display:'none'}});
            Alert.alert('Atención','Debes iniciar sesión',[{
                text:'Ok',
                onPress:()=>{navigation.navigate('Login');}
            }]);
        })
    }
    /*FIREBASE END */
    function asignarChats(chats){
        setState({...state,chats:chats,loading_display:{display:'none'}});
    }
    return(
        <View style={styles.contenedor_general_chats}>
            <View style={styles.contenedor_chats}>
            <ActivityIndicator size="large" color="skyblue" style={state.loading_display} />
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>onRefresh()}/>}>
                    { 
                        state.chats.map((p,i)=>(
                            <TouchableOpacity key={i} onPress={()=>navigation.push('Messages',{uid:p.uid,chatId:p.idchat})} activeOpacity={0.6}>
                                <View style={styles.cont_target_b}>
                                    <View style={styles.target_b}>
                                        <View style={styles.target_cont_b}>
                                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                                <View style={[styles.icon_target_b_cont_1,{marginLeft:10}]}>
                                                    <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                                    style={styles.fondo_icon_target_b}>
                                                        <ImageBackground source={p.url_photo} style={styles.image_target_b}/>
                                                    </LinearGradient>
                                                </View>
                                                <View style={styles.row_b}>
                                                    <View style={styles.det_atg_b}>
                                                        <Text style={styles.title_b}>{p.userName}</Text>
                                                        <Text style={styles.detalles_b}>{p.lastMessage}</Text>
                                                    </View>                                  
                                                </View>
                                                <View style={[styles.icon_target_b_cont_2,{marginLeft:130}]}>
                                                    <View style={styles.icon_target}>
                                                        <FontAwesome5 size={25} name='angle-right' color='grey'/>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
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
                        <TouchableOpacity activeOpacity={0.6}>
                            <View style={styles.button_menu_container}>
                                <Ionicons name="md-settings" size={35} color="white" />
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
        </View>
    );
}