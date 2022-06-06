import { StyleSheet, View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
export default function Interfaz(){
    return(
        <>
            <View style={styles.contenedor}>
                    <View style={styles.circle_cont}>
                        <View style={styles.circle}>
                            <Text style={styles.text_1}>82</Text>
                            <Text style={styles.text_small}>Algunos elementos pueden optimiza...</Text>
                            <View style={styles.button_opt}>
                                <Text style={styles.optimizar}>Optimizar</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.target_cont}>
                        <View style={styles.fila}>
                            <View style={styles.caja1}>
                                <View style={styles.contenido_caja}>
                                    <FontAwesome5 style={styles.icon} name='trash' color='red' size={25}/>
                                    <Text style={styles.limpiador}>Limpiador</Text>
                                    <Text style={styles.det_lim}>94% de espacio de almacenami...</Text>
                                </View>
                            </View>
                            <View style={styles.caja2}>
                                <View style={styles.contenido_caja}>
                                    <View style={{flexDirection:'row'}}>
                                        <FontAwesome5 style={styles.icon} name='circle' color='green' size={25}/>
                                        <View style={{height:4,width:4,borderRadius:100,backgroundColor:'red'}}></View>
                                    </View>
                                    <Text style={styles.analisis}>Análisis de seguridad</Text>
                                    <Text style={styles.det_ana}>No ha analizado el dispositivo p...</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.fila}>
                            <View style={styles.caja1}>
                                <View style={styles.contenido_caja}>
                                    <FontAwesome5 style={styles.icon} name='battery-three-quarters' color='green' size={25}/>
                                    <Text style={styles.bateria}>Batería y rendimiento</Text>
                                    <Text style={styles.det_bat}>47 min hasta carga completa</Text>
                                </View>
                            </View>
                            <View style={styles.caja2}>
                                <View style={styles.contenido_caja}>
                                    <View style={{flexDirection:'row'}}>
                                        <FontAwesome5 style={styles.icon} name='rocket' color='#64D1D1' size={25}/>
                                    </View>
                                    <Text style={styles.velocidad}>Aumentar velocidad</Text>
                                    <Text style={styles.det_vel}>Limpiar memoria</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.fila}>
                            <View style={styles.caja1}>
                                <View style={styles.contenido_caja}>
                                    <FontAwesome5 style={styles.icon} name='android' color='#04B5D1' size={25}/>
                                    <Text style={styles.android}>Administrar aplica...</Text>
                                    <Text style={styles.det_droid}>Actualizar y desintalar aplicaci...</Text>
                                </View>
                            </View>
                            <View style={styles.caja2}>
                                <View style={styles.contenido_caja}>
                                    <View style={{flexDirection:'row'}}>
                                        <FontAwesome5 style={styles.icon} name='brush' color='orange' size={25}/>
                                        <View style={{height:4,width:4,borderRadius:100,backgroundColor:'red', marginLeft:3}}></View>
                                    </View>
                                    <Text style={styles.limpieza}>Limpieza profunda</Text>
                                    <Text style={styles.det_limp}>60.4 GB/64 GB ocupado</Text>
                                </View>
                            </View>
                        </View>                    
                    </View>
                    <View style={styles.cont_target_b}>
                        <View style={styles.target_b}>
                            <View style={styles.target_cont_b}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={styles.icon_target_b_cont_1}>
                                        <View style={styles.icon_target_b}>
                                            <View style={styles.fondo_icon_target_b}>
                                                <FontAwesome5 size={13} name='brush' color='white'/>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.row_b}>
                                        <View style={styles.det_atg_b}>
                                            <Text style={styles.limpieza_b}> Limpieza profunda</Text>
                                            <Text style={styles.detalles_b}>Realizar un análisis para liberar espacio de almacenamiento</Text>
                                        </View>                                  
                                    </View>
                                    <View style={styles.icon_target_b_cont_2}>
                                        <View style={styles.icon_target_b}>
                                            <FontAwesome5 size={25} name='angle-right' color='grey'/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
            </View>
        </>
    );
}
const styles =  StyleSheet.create({
    fondo_icon_target_b:{
        backgroundColor:'orange',
        width:23,
        height:23,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'grey',
        borderWidth:1
    },
    limpieza_b:{
        fontSize:15,
        fontWeight:'bold'
    },
    icon_target_b_cont_1:{
        flexDirection:'column',
        justifyContent:'center'
    },
    icon_target_b_cont_2:{
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:30
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
        borderTopEndRadius:15,
        borderTopLeftRadius:15,
        flexDirection:'column',
        justifyContent:'center'
    },
    cont_target_b:{
        flex:0.1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#EEF1F3',
        marginTop:10
    },
    det_limp:{
        fontSize:10.5,
        width:170,
        color:'#F27717'
    },  
    limpieza:{
        marginTop:8,
        fontSize:16,
        fontWeight:'bold',
        color:'#F27717'
    },
    det_droid:{
        fontSize:10.5,
        width:170
    },  
    android:{
        marginTop:8,
        fontSize:16,
        fontWeight:'bold',
        width:170
    },
    det_vel:{
        fontSize:10.5,
        width:170
    },  
    bateria:{
        marginTop:8,
        fontSize:16,
        fontWeight:'bold'
    },
    det_bat:{
        fontSize:10.5,
        width:170
    },
    det_ana:{
        fontSize:10.5,
        width:170,
        color:'#F27717'
    },  
    analisis:{
        marginTop:8,
        fontSize:16,
        fontWeight:'bold',
        color:'#F27717'
    },
    caja2:{
       width:173,
       height:100,
       marginLeft:15,
       backgroundColor:'white',
       borderRadius:15,
       justifyContent:'center' 
    },
    det_lim:{
        fontSize:10.5,
        width:170
    },  
    contenido_caja:{
        marginLeft:10
    },
    limpiador:{
        marginTop:8,
        fontSize:16,
        fontWeight:'bold'
    },
    caja1:{
       width:173,
       height:100,
       marginLeft:15,
       backgroundColor:'white',
       borderRadius:15,
       justifyContent:'center' 
    },
    target_cont:{
        flex:0.45
    },
    contenedor:{
        flex: 1,
        backgroundColor:'#EEF1F3'
    },
    circle_cont:{
        flex:0.50,
        justifyContent:'center',
        alignItems:'center'
    },
    circle:{
        backgroundColor:'white',
        width:270,
        height:270,
        borderRadius:150,
        alignItems:'center',
        marginTop:25,
        borderColor:'#40DDF3',
        borderWidth:3
    },
    text_1:{
        fontSize:60,
        fontWeight:'bold',
        marginTop:30
    },
    text_small:{
        fontSize:12
    },
    button_opt:{
        backgroundColor:'#EEF1F3',
        borderRadius:50,
        width:145,
        height:39,
        alignItems:'center',
        justifyContent:'center',
        marginTop:25
    },
    optimizar:{
        color:'#10A1DC',
        fontSize:17,
        fontWeight:'bold'
    },
    fila:{
        flexDirection:'row',
        marginTop:10
    }
});