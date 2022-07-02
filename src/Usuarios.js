import { View, Text,ScrollView, ImageBackground, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import CSS from "./Styles";
export default function Interfaz(){
    const styles = CSS.styles;
    var perfil = require('./img/default_profile.jpg');
    const data = [
        {username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},{username:'Usuario',url_photo:'url',url_portada:'url_2'},
    ];
    const formatData=(data,numColums)=>{
        const n_filas = Math.floor(data.length/numColums);

        let n_element_lastrow = data.length - (n_filas);
        
        return data;
    }
    const numColums = 2;
    const renderItem = ({item,index})=>{
        return(
            <View style={styles.caja1_usu}>
            <View style={styles.contenido_caja_usu}>
                <FontAwesome5 style={styles.icon_usu} name='circle' color='red' size={25}/>
                <Text style={styles.limpiador_usu}>Limpiador</Text>
                <Text style={styles.det_lim_usu}>94% de espacio de almacenami...</Text>
            </View>
        </View>
        );
    }
    return(
        <>
            <View style={styles.contenedor_usu}>
                <ScrollView>
                    <View style={styles.circle_cont_usu}>
                        <ImageBackground style={styles.circle_usu} source={perfil}>
                            <Text style={styles.text_1_usu}>Nombre usuario</Text>
                            <Text style={styles.text_small_usu}>usuariosejemplo@gmail.com</Text>
                            <View style={styles.button_opt_usu}>
                                <Text style={styles.optimizar_usu}>Cambiar foto</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <FlatList style={{flex:1, flexDirection:'row',backgroundColor:'#EEF1F3'}} data={formatData(data,numColums)} renderItem={renderItem} numColumns={numColums}/>
                    <View style={styles.cont_target_b_usu}>
                        <View style={styles.target_b}>
                            <View style={styles.target_cont_b_usu}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={styles.icon_target_b_cont_1_usu}>
                                        <View style={styles.icon_target_b_usu}>
                                            <View style={styles.fondo_icon_target_b_usu}>
                                                <FontAwesome5 size={13} name='brush' color='white'/>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.row_b_usu}>
                                        <View style={styles.det_atg_b_usu}>
                                            <Text style={styles.limpieza_b_usu}> Limpieza profunda</Text>
                                            <Text style={styles.detalles_b_usu}>Realizar un análisis para liberar espacio de almacenamiento</Text>
                                        </View>                                  
                                    </View>
                                    <View style={styles.icon_target_b_cont_2_usu}>
                                        <View style={styles.icon_target_b_usu}>
                                            <FontAwesome5 size={25} name='angle-right' color='grey'/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
}