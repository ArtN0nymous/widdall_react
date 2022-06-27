import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Button, TextInput, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
export default function({navigation}){
    var img = require('./img/default_profile.jpg');
    return(
        <>
        <LinearGradient style={styles.contenedor} colors={['#0364A3','#0695F3','#68BFF7','#0364A3']}>
            <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.border_image}>
                <Image source={img} style={styles.img}/>
            </LinearGradient>
            <TextInput keyboardType="default" placeholder="Nombre de usuario" placeholderTextColor={'blue'} style={styles.inputs}/>
            <TextInput keyboardType="default" placeholder="Contraseña" secureTextEntry={true} placeholderTextColor={'blue'} style={styles.inputs}/>
            <TextInput keyboardType="default" placeholder="Repita su contraseña" secureTextEntry={true} placeholderTextColor={'blue'} style={styles.inputs}/>
            <TouchableOpacity activeOpacity={0.6}>
                <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.login_btn}>
                    <Text style={styles.texts}>Registrarme</Text>
                </LinearGradient>
            </TouchableOpacity>
        </LinearGradient>
        </>
    );
}
const styles=StyleSheet.create({
    contenedor:{
        flex:1,
        alignItems:'center'
    },
    img:{
        width:70,
        height:70,
        borderRadius:90
    },
    border_image:{
        marginTop:10,
        width: 103,
        height: 103,
        borderRadius: 40,
        padding: 0,
        overflow: 'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    inputs:{
        borderColor:'blue',
        borderWidth:2,
        borderRadius:20,
        textAlign:'center',
        width:200,
        marginTop:10,
        backgroundColor:'rgba(0,0,0,0.15)',
        color:'#532FF1',
        fontWeight:'bold'
    },
    texts:{
        fontSize:10,
        color:'white',
        fontWeight:'bold'
    },
    login_btn:{
        width:70,
        height:35,
        borderRadius:10,
        marginTop:50,
        justifyContent:'center',
        alignItems:'center',
    }
});