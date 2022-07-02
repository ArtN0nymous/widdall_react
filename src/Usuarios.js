import { View, Text,ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import CSS from "./Styles";
export default function Interfaz(){
    const styles = CSS.styles;
    return(
        <>
            <View style={styles.contenedor_usu}>
                <ScrollView>
                    <View style={styles.circle_cont_usu}>
                        <View style={styles.circle_usu}>
                            <Text style={styles.text_1_usu}>82</Text>
                            <Text style={styles.text_small_usu}>Algunos elementos pueden optimiza...</Text>
                            <View style={styles.button_opt_usu}>
                                <Text style={styles.optimizar_usu}>Editar</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.target_cont_usu}>
                        <View style={styles.fila_usu}>
                            <View style={styles.caja1_usu}>
                                <View style={styles.contenido_caja_usu}>
                                    <FontAwesome5 style={styles.icon_usu} name='trash' color='red' size={25}/>
                                    <Text style={styles.limpiador_usu}>Limpiador</Text>
                                    <Text style={styles.det_lim_usu}>94% de espacio de almacenami...</Text>
                                </View>
                            </View>
                            <View style={styles.caja2_usu}>
                                <View style={styles.contenido_caja_usu}>
                                    <View style={{flexDirection:'row'}}>
                                        <FontAwesome5 style={styles.icon_usu} name='circle' color='green' size={25}/>
                                        <View style={{height:4,width:4,borderRadius:100,backgroundColor:'red'}}></View>
                                    </View>
                                    <Text style={styles.analisis_usu}>Análisis de seguridad</Text>
                                    <Text style={styles.det_ana_usu}>No ha analizado el dispositivo p...</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.fila_usu}>
                            <View style={styles.caja1_usu}>
                                <View style={styles.contenido_caja_usu}>
                                    <FontAwesome5 style={styles.icon_usu} name='battery-three-quarters' color='green' size={25}/>
                                    <Text style={styles.bateria_usu}>Batería y rendimiento</Text>
                                    <Text style={styles.det_bat}>47 min hasta carga completa</Text>
                                </View>
                            </View>
                            <View style={styles.caja2_usu}>
                                <View style={styles.contenido_caja_usu}>
                                    <View style={{flexDirection:'row'}}>
                                        <FontAwesome5 style={styles.icon_usu} name='rocket' color='#64D1D1' size={25}/>
                                    </View>
                                    <Text style={styles.velocidad_usu}>Aumentar velocidad</Text>
                                    <Text style={styles.det_vel_usu}>Limpiar memoria</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.fila_usu}>
                            <View style={styles.caja1_usu}>
                                <View style={styles.contenido_caja_usu}>
                                    <FontAwesome5 style={styles.icon_usu} name='android' color='#04B5D1' size={25}/>
                                    <Text style={styles.android_usu}>Administrar aplica...</Text>
                                    <Text style={styles.det_droid_usu}>Actualizar y desintalar aplicaci...</Text>
                                </View>
                            </View>
                            <View style={styles.caja2_usu}>
                                <View style={styles.contenido_caja_usu}>
                                    <View style={{flexDirection:'row'}}>
                                        <FontAwesome5 style={styles.icon_usu} name='brush' color='orange' size={25}/>
                                        <View style={{height:4,width:4,borderRadius:100,backgroundColor:'red', marginLeft:3}}></View>
                                    </View>
                                    <Text style={styles.limpieza_usu}>Limpieza profunda</Text>
                                    <Text style={styles.det_limp_usu}>60.4 GB/64 GB ocupado</Text>
                                </View>
                            </View>
                        </View>                    
                    </View>
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