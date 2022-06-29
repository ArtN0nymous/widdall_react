import { LinearGradient } from "expo-linear-gradient";
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Chat from "./Chat";
export default function BandejaChats(navigation){
    const img = require('./img/default_profile.jpg');
    var chats = [
        {
            usuario:'Usuario',
            mensaje:'Ejemplo de mensaje',
            img:''
        }
    ];
    return(
        <>
            <View style={styles.contenedor}>
                <ScrollView>
                    { 
                        chats.map((p)=>(
                            <Chat key={p.usuario} usuario={p.usuario} mensaje={p.mensaje}/>
                        ))
                    }
                </ScrollView>
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
        backgroundColor:'blue'
    }
});