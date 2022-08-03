import { View,Text,ImageBackground,TouchableOpacity } from "react-native";
import { FontAwesome5,AntDesign } from '@expo/vector-icons';
import Styles from "./Styles";
export default function Publicacione({usuario,profile,descrip,img,fecha,stars}){
    const styles=Styles.styles;
    let date = new Date(fecha);
    let fulltime = date.toLocaleDateString();
    return(
        <View style={styles.tarjeta_public_cont}>
            <View style={styles.header_public}>
                <View style={styles.contenedor_profile_public}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <ImageBackground style={styles.image_profile_public} source={{uri:profile.url_photo}}/>
                        <Text style={styles.text_name_profile_public}>{profile.displayName}</Text>
                    </View>
                </View>
                <Text style={{alignSelf:'flex-end'}}>{fulltime}</Text>
            </View>
            <Text style={styles.descrip_public}>{descrip}</Text>
            <ImageBackground style={styles.image_public} source={{uri:img}}/>
            <View style={styles.footer_public}>
                <View style={[styles.contenedor_boton_menu,styles.footer_buttons,{backgroundColor:'rgba(220,197,4,0.2)'}]}>
                    <TouchableOpacity activeOpacity={0.2}>
                        <View style={styles.button_menu_container}>
                            <Text style={{position:'absolute', zIndex:3}}>0</Text>
                            <AntDesign name="star" size={35} color="gold" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.contenedor_boton_menu,styles.footer_buttons,{backgroundColor:'rgba(5,155,197,0.5)'}]}>
                    <TouchableOpacity activeOpacity={0.6}>
                        <View style={styles.button_menu_container}>
                            <FontAwesome5 name="share" size={35} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}