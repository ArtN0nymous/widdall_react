import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
export default function Imagenes(){
    var image_f = require('./img/f1.jpg');
    var img = require('./img/unnamed.jpg');
    return(
       <ImageBackground source={image_f} style={styles.contendedor}>
           <View style={styles.info}>
            <Image source={img} style={styles.img}/>
            <Text style={styles.texto}>RAMON</Text>
            <Text style={{fontSize:27,color:'white'}}>Ringing</Text>
           </View>
           <View style={styles.barContainer}>
               <View style={{alignItems:'center'}}>
                    <FontAwesome5 name="angle-up" size={24} color="black" />
               </View>
                <View style={styles.bar}>
                    <FontAwesome5 name="volume-up" size={24} color="white" />
                    <FontAwesome5 name="video" size={24} color="#B4ADAC" />
                    <FontAwesome5 name="microphone-slash" size={24} color="white" />
                    <View style={{height:50,width:50, borderRadius:100, backgroundColor:'red', justifyContent:'center',alignItems:'center'}}>
                        <FontAwesome5 name="phone-slash" size={24} color="white" />
                    </View>
                </View>
           </View>
       </ImageBackground> 
    );
}
const styles = StyleSheet.create({
    contendedor:{
        flex:1
    },
    info:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    img:{
        width:200,
        height:200,
        borderRadius:250,
        borderColor:'black',
        borderWidth:10
    },
    texto:{
        fontSize:40,
        color:'white'
    },
    barContainer:{
        backgroundColor:'grey',
        height:100,
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    bar:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    }
});