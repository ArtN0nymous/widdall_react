import { LinearGradient } from "expo-linear-gradient";
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Chat from "./Chat";
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from "./database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
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
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);
    var chats = [
        {
            usuario:'Usuario',
            mensaje:'Ejemplo de mensaje',
            img:''
        }
    ];
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
        <>
            <View style={styles.contenedor}>
                <ScrollView>
                    <TouchableOpacity activeOpacity={0.6} onPress={cerrarSesion}>
                        <View style={{width:100,height:40,backgroundColor:'white'}}>
                            <Text>Cerrar Sesión</Text>
                        </View>
                    </TouchableOpacity>
                    { 
                        chats.map((p)=>(
                            <TouchableOpacity onPress={()=>navigation.push('Messages')} activeOpacity={0.6}>
                                <Chat key={p.usuario} usuario={p.usuario} mensaje={p.mensaje}/>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
            </View>
        </>
    );
}
const styles=StyleSheet.create({
    contenedor:{
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor:'#0B2379'
    }
});