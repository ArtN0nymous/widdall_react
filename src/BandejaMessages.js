import { View, Text, Image, ImageBackground,TextInput,StyleSheet,ScrollView, TouchableOpacity } from "react-native";
import CSS from './Styles';
import Messages from "./Message";
export default function BandejaMessages({navigation}){
    var styles = CSS.styles;
    var fondo = require('./img/fondo.png');
    var messages =[
        {
            user:'Usuario ejemplo',
            message:'Mensaje de ejemplo',
            hora:'10:20',
            tipo:1
        }
    ];
    return(
        <>
        <ImageBackground style={styles.contenedor_messages} source={fondo}>
                <ScrollView>
                    { 
                        messages.map((p)=>(
                            <TouchableOpacity activeOpacity={0.6}>
                                <Messages key={p.user} user={p.user} mensaje={p.mensaje}/>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <TextInput placeholder="Escribe un mensaje..." style={styles.input_messages}/>
            </ImageBackground>
        </>
    );
}