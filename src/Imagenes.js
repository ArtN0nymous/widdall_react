import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
export default function Imagenes(){
    var image_f = require('./img/f1.jpg');
    var img = require('./img/unnamed.jpg')
    return(
       <ImageBackground source={image_f} style={styles.contendedor}>
           <Image source={img} style={styles.img}/>
           <Text>USUARIOS</Text>
           <View style={styles.bar}>
                <View style={{alingItems:'center'}}>
                    <AntDesign name="caretleft" size={24} color="black" />
                    <AntDesign name="pluscircle" size={24} color="black" />
                    <AntDesign name="pluscircle" size={24} color="black" />
                    <AntDesign name="pluscircle" size={24} color="black" />
                </View>
           </View>
       </ImageBackground> 
    );
}
const styles = StyleSheet.create({
    contendedor:{
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    img:{
        width:300,
        height:300,
        borderRadius:250,
        borderColor:'black',
        borderWidth:10
    },
    texto:{
        fontSize:40,
        color:'blue'
    },
    bar:{
        backgroundColor:'red',
        height:50,
        borderTopLeftRadius:20,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        alignSelf:'flex-end'
    }
});