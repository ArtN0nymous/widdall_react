import { View, Text, Image, ImageBackground,TextInput,StyleSheet,ScrollView } from "react-native";
import CSS from './Styles';
import Messages from "./Message";
export default function BandejaMessages({navigation}){
    var styles = CSS.styles;
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
        <View style={styles.contenedor}>
                <ScrollView>
                    { 
                        messages.map((p)=>(
                            <TouchableOpacity activeOpacity={0.6}>
                                <Messages key={p.user} user={p.user} mensaje={p.mensaje}/>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <TextInput placeholder="Escribe un mensaje..."/>
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