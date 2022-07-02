import { StyleSheet,Dimensions } from "react-native";
var ancho = Dimensions.get('screen').width;
var alto = Dimensions.get('screen').height;
function dimension(prop,porcent){
    if(prop=='H'){
        return alto = (alto*porcent)/100;
    }else{
        return ancho = (ancho*porcent)/100;
    }
}
const styles = StyleSheet.create({
    /*--Chat.js BEGIN--*/
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
    image_target_b:{
        width:50,
        height:50,
        borderRadius:90
    },
    icon_target:{
        marginLeft:80
    },
    cont2:{
        backgroundColor:'red'
    },
    /*--Chat.js END--*/
    /*--Login.js BEGIN--*/
    contenerdor_login:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:'#0B2379'
    },
    imagen_login:{
        borderRadius:50,
        width:100,
        height:100,
        borderColor:'#0895B9',
        borderWidth:2
    },
    text_login:{
        fontSize:30
    },
    inputs_login:{
        fontSize:20,
        alignSelf:'stretch',
        height:40,
        backgroundColor:'white',
        textAlign:'center',
        borderColor:'#0B2379',
        borderRadius:10,
        marginTop:10,
        marginRight:40,
        marginLeft:40,
        borderWidth:2,
        color:'blue',
    },
    boton_login:{
        width:136,
        height:40,
        backgroundColor:'#3C05A2',
        borderColor:'white',
        borderWidth:2,
        borderRadius:10,
        marginTop:10,
        marginBottom:10
    },
    form_login:{
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'stretch',
        borderRadius:20,
        margin:10
    },
    border_image_login:{
        marginTop:10,
        width: 103,
        height: 103,
        borderRadius: 40,
        padding: 0,
        overflow: 'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    /*--Login.js END--*/
    /*--Registro.js BEGIN--*/
    contenedor_regist:{
        flex:1,
        alignItems:'center'
    },
    img_regist:{
        width:70,
        height:70,
        borderRadius:90
    },
    border_image_regist:{
        marginTop:10,
        width: 103,
        height: 103,
        borderRadius: 40,
        padding: 0,
        overflow: 'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    inputs_regist:{
        borderColor:'#0B2379',
        borderWidth:2,
        borderRadius:10,
        textAlign:'center',
        width:dimension('W',70),
        marginTop:10,
        backgroundColor:'rgba(0,0,0,0.15)',
        color:'#532FF1',
        fontWeight:'bold',
        height:36
    },
    texts_regist:{
        fontSize:15,
        color:'white',
        fontWeight:'bold'
    },
    login_btn_regist:{
        width:100,
        height:40,
        borderRadius:5,
        marginTop:50,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#0B2379',
        borderWidth:2
    },
    /*--Registro.js END--*/
    /*--BandejaMessages.js BEGIN--*/
    contenedor_messages:{
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'flex-start'
    },
    scroll_messages:{
        width:dimension('W',140)
    },
    input_messages:{
        borderColor:'blue',
        borderWidth:2,
        borderRadius:10,
        textAlign:'center',
        width:dimension('W',60),
        marginTop:10,
        backgroundColor:'#94CAF9',
        color:'#532FF1',
        fontWeight:'bold',
        fontSize:17,
        marginBottom:10
    },
    contenedor_input_messa:{
        flexDirection:'row',
        backgroundColor:'rgba(0,0,0,0.1)',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    fondo_icon_target_message:{
        backgroundColor:'#349DF8',
        width:30,
        height:30,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'blue',
        borderWidth:1,
        margin:5
    },
    send_btn_message:{
        backgroundColor:'white',
        width:28,
        height:28,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'blue',
        borderWidth:1,
        marginLeft:3
    },
    /*--BandejaMessages.js END--*/
    /*--Message.js BEGIN--*/
    contenedor_message:{
        justifyContent:'center',
        marginTop:6,
    },
    texto_message:{
        fontSize:15,
        textAlign:'justify',
        margin:8,
        color:'white'
    },
    triangle_left_message: {
        position: "absolute",
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        borderTopColor: "transparent",
        borderTopWidth: 17,
        borderRightWidth: 30,
        borderRightColor: "rgba(9,69,220,0.91)",
        borderBottomWidth: 9,
        borderBottomColor: "transparent"
    },
    triangle_right_message:{
        position: "absolute",
        top: 6,
        right:0,
        width: 0,
        height: 0,
        borderTopColor: "transparent",
        borderTopWidth: 5,
        borderRightWidth: 15,
        borderRightColor: "rgba(68,31,161,0.91)",
        borderBottomWidth: 9,
        borderBottomColor: "transparent",
        transform:[{rotate:"180deg"}],
        alignSelf:'flex-end'
    },
    /*Message.js END--*/
    /*--Usuraios.js BEGIN*/
    fondo_icon_target_b_usu:{
        backgroundColor:'orange',
        width:23,
        height:23,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'grey',
        borderWidth:1
    },
    limpieza_b_usu:{
        fontSize:15,
        fontWeight:'bold'
    },
    icon_target_b_cont_1_usu:{
        flexDirection:'column',
        justifyContent:'center'
    },
    icon_target_b_cont_2_usu:{
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:30
    },
    det_atg_b_usu:{
        flexDirection:'column',
        alignItems:'stretch'
    },
    row_b_usu:{
        flexDirection:'row',
        marginTop:5,
        marginLeft:20
    },
    target_cont_b_usu:{
        marginLeft:10
    },  
    target_b_usu:{
        width:370,
        height:70,
        backgroundColor: 'white',
        borderTopEndRadius:15,
        borderTopLeftRadius:15,
        flexDirection:'column',
        justifyContent:'center'
    },
    cont_target_b_usu:{
        flex:0.1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#EEF1F3',
        marginTop:10
    },
    det_limp_usu:{
        fontSize:10.5,
        width:170,
        color:'#F27717'
    },  
    limpieza_usu:{
        marginTop:8,
        fontSize:16,
        fontWeight:'bold',
        color:'#F27717'
    },
    det_droid_usu:{
        fontSize:10.5,
        width:170
    },  
    android_usu:{
        marginTop:8,
        fontSize:16,
        fontWeight:'bold',
        width:170
    },
    det_vel_usu:{
        fontSize:10.5,
        width:170
    },  
    bateria_usu:{
        marginTop:8,
        fontSize:16,
        fontWeight:'bold'
    },
    det_bat_usu:{
        fontSize:10.5,
        width:170
    },
    det_ana_usu:{
        fontSize:10.5,
        width:170,
        color:'#F27717'
    },  
    analisis_usu:{
        marginTop:8,
        fontSize:16,
        fontWeight:'bold',
        color:'#F27717'
    },
    caja2_usu:{
       width:173,
       height:100,
       marginLeft:15,
       backgroundColor:'white',
       borderRadius:15,
       justifyContent:'center' 
    },
    det_lim_usu:{
        fontSize:10.5,
        width:170
    },  
    contenido_caja:{
        marginLeft:10
    },
    limpiador_usu:{
        marginTop:8,
        fontSize:16,
        fontWeight:'bold'
    },
    caja1_usu:{
       width:173,
       height:100,
       marginLeft:15,
       backgroundColor:'white',
       borderRadius:15,
       justifyContent:'center' 
    },
    target_cont_usu:{
        flex:0.45
    },
    contenedor_usu:{
        flex: 1,
        backgroundColor:'#EEF1F3'
    },
    circle_cont_usu:{
        flex:0.50,
        justifyContent:'center',
        alignItems:'center'
    },
    circle_usu:{
        backgroundColor:'white',
        width:270,
        height:270,
        borderRadius:150,
        alignItems:'center',
        marginTop:25,
        borderColor:'#40DDF3',
        borderWidth:3
    },
    text_1_usu:{
        fontSize:60,
        fontWeight:'bold',
        marginTop:30
    },
    text_small_usu:{
        fontSize:12
    },
    button_opt_usu:{
        backgroundColor:'#EEF1F3',
        borderRadius:50,
        width:145,
        height:39,
        alignItems:'center',
        justifyContent:'center',
        marginTop:25
    },
    optimizar_usu:{
        color:'#10A1DC',
        fontSize:17,
        fontWeight:'bold'
    },
    fila_usu:{
        flexDirection:'row',
        marginTop:10
    }
    /*Usuarios.js END */
});
export default{
    styles
};