import { Text,View,StyleSheet } from "react-native";
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

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor:'#53F903',
        flex:1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center'
    },
    amarillo:{
        width:50,
        height:50,
        backgroundColor:'yellow'
    },
    azul:{
        width:50,
        height:50,
        backgroundColor:'blue',
        right:-50
    },
    rosa:{
        width:50,
        height:50,
        backgroundColor:'pink'
    }
});