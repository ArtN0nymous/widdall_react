import { LinearGradient } from "expo-linear-gradient";
import { View,Image, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import CSS from "./Styles";
export default function Chat({usuario,mensaje}) {
    var img = require('./img/default_profile.jpg');
    var styles = CSS.styles;
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
                                    <Image source={img} style={styles.image_target_b}/>
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