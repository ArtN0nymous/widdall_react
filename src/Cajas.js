import { Text,View,StyleSheet,Dimensions } from "react-native";
export default function Cajas(){

    return(
        <View style={styles.contenedor}>
            <View style={styles.amarillo}>
            </View>
            <View style={styles.azul}>
            </View>
            <View style={styles.rosa}>
            </View>
        </View>
    );
}
let ancho = Dimensions.get("window").width;
let altura = Dimensions.get("window").height;
const styles = StyleSheet.create({
    contenedor:{
        backgroundColor:'#53F903',
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:"center"
    },
    amarillo:{
        width:50,
        height:50,
        backgroundColor:'yellow',
        borderColor:'red',
        borderWidth:2,
        top:-25
    },
    azul:{
        width:50,
        height:50,
        backgroundColor:'blue',
        borderColor:'red',
        borderWidth:2   
    },
    rosa:{
        width:50,
        height:50,
        backgroundColor:'pink',
        borderColor:'red',
        borderWidth:2,
        top:-25 
    }
});