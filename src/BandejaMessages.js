import { View, Text, Image, ImageBackground,TextInput,StyleSheet,ScrollView, TouchableOpacity } from "react-native";
import CSS from './Styles';
import Messages from "./Message";
import { FontAwesome5 } from "@expo/vector-icons";
export default function BandejaMessages({navigation}){
    var styles = CSS.styles;
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
    return(
        <>
            <View style={styles.contenedor_messages}>
                <ScrollView style={styles.scroll_messages}>
                    { 
                        messages.map((p)=>(
                            <TouchableOpacity activeOpacity={0.6}>
                                <Messages key={p.user} user={p.user} mensaje={p.message} tipo={p.tipo}/>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <View style={styles.contenedor_input_messa}>
                    <View style={styles.icon_target_b_cont_1}>
                        <View style={styles.fondo_icon_target_message}>
                            <FontAwesome5 size={13} name='photo-video' color='white'/>
                        </View>
                    </View>
                    <TextInput placeholder="Escribe un mensaje..." style={styles.input_messages} multiline={true}/>
                    <View style={{flexDirection:'column',justifyContent:'center'}}>
                        <View style={styles.send_btn_message}>
                            <FontAwesome5 size={25} name='angle-right' color='blue'/>
                        </View>
                    </View>
                    <View style={styles.icon_target_b_cont_1}>
                        <View style={styles.fondo_icon_target_message}>
                            <FontAwesome5 size={13} name='file' color='white'/>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}