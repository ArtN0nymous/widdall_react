import { LinearGradient } from "expo-linear-gradient";
import { View,Image, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
export default function Chat({usuario,mensaje}) {
    var img = require('./img/default_profile.jpg');
    return(
        <>
        <View style={styles.cont_target_b}>
            <View style={styles.target_b}>
                <View style={styles.target_cont_b}>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.icon_target_b_cont_1}>
                            <View style={styles.icon_target_b}>
                                <LinearGradient colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                style={styles.fondo_icon_target_b}>
                                    <Image source={img} style={styles.image}/>
                                </LinearGradient>
                            </View>
                        </View>
                        <View style={styles.row_b}>
                            <View style={styles.det_atg_b}>
                                <Text style={styles.title_b}>{usuario}</Text>
                                <Text style={styles.detalles_b}>{mensaje}</Text>
                            </View>                                  
                        </View>
                        <View style={styles.icon_target_b_cont_2}>
                            <View style={styles.icon_target}>
                                <FontAwesome5 size={25} name='angle-right' color='grey'/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        </>
    );
}
const styles = StyleSheet.create({
    fondo_icon_target_b:{
        width:60,
        height:60,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'grey'
    },
    title_b:{
        fontSize:15,
        fontWeight:'bold'
    },
    icon_target_b_cont_1:{
        flexDirection:'column',
        justifyContent:'center'
    },
    icon_target_b_cont_2:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:30,
        width:110
    },
    det_atg_b:{
        flexDirection:'column',
        alignItems:'stretch'
    },
    row_b:{
        flexDirection:'row',
        marginTop:5,
        marginLeft:20
    },
    target_cont_b:{
        marginLeft:10
    },  
    target_b:{
        width:370,
        height:70,
        backgroundColor: 'white',
        flexDirection:'column',
        justifyContent:'center',
        borderRadius:10
    },
    cont_target_b:{
        flex:0.1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    image:{
        width:50,
        height:50,
        borderRadius:90
    },
    icon_target:{
        marginLeft:80
    }
});