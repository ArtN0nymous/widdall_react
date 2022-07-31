import { StyleSheet,Dimensions } from "react-native";
var ancho = Dimensions.get('screen').width;
var alto = Dimensions.get('screen').height;
function dimension(prop,porcent){
    if(prop=='H'){
        return alto = Math.trunc((alto*porcent)/100);
    }else{
        return ancho = Math.trunc((ancho*porcent)/100);
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
        justifyContent:'center',
        alignItems:'center',
        marginLeft:5,
        width:30,
        height:30
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
        borderRadius:90,
        overflow:'hidden'
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
    loading_contenedor:{
        width:dimension('W',100),
        height:dimension('H',100),
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.60)',
        zIndex:10,
        alignItems:'center'
    },
    loading:{
        backgroundColor:'white',
        borderRadius:10,
        width:100,
        height:100,
        position:'absolute',
        top:dimension('H',20)
    },
    loading_text:{
        fontSize:13,
        color:'black',
        top:dimension('H',145)
    },
    contenedor_switch:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.15)',
        marginTop:10,
        borderRadius:10
    },
    texto_switch:{
        fontSize:17,
        color:'white',
        fontWeight:'bold',
        marginLeft:3
    },
    contenedor_regist:{
        flex:1,
        alignItems:'center'
    },
    img_regist:{
        width:200,
        height:200,
        borderRadius:90
    },
    border_image_regist:{
        marginTop:10,
        width: 230,
        height: 230,
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
    open_btn_regist:{
        width:100,
        height:40,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#0B2379',
        borderWidth:2,
        marginBottom:10
    },
    btn_cancel_regist:{
        width:30,
        height:30, 
        backgroundColor:'rgba(0,0,0,0.15)',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        left:dimension('W',30),
        margin:5
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
        width:dimension('W',440)
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
    butons_input_message:{
        flexDirection:'column',
        justifyContent:'center'
    },
    hora_message:{
        fontSize:12,
        margin:3
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
    miniatura_imagen_message:{
        width:100,
        height:100,
        backgroundColor:'gray',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        overflow:'hidden'
    },
    cerrar_miniatura:{
        width:70,
        height:70,
        backgroundColor:'rgba(255,255,255,0.2)',
        textAlign:'center',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
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
        marginBottom:0,
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
        width:50,
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'grey',
        borderWidth:1,
        overflow:'hidden'
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
        marginLeft:0
    },
    det_atg_b_usu:{
        flexDirection:'column',
        alignItems:'stretch',
        width:dimension('W',100)
    },
    row_b_usu:{
        flexDirection:'row',
        marginTop:5,
        marginLeft:15
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
        flexDirection:'row',
        justifyContent:'center'
    },
    cont_target_b_usu:{
        flex:0.1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#EEF1F3',
        marginTop:10
    },
    det_lim_usu:{
        fontSize:10.5,
        width:170
    },  
    contenido_caja_usu:{
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
       borderRadius:15,
       justifyContent:'center',
       marginTop:5
    },
    text_1_usu:{
        fontSize:20,
        fontWeight:'bold',
        backgroundColor:'rgba(255,255,255,0.2)',
        borderRadius:10
    },
    text_small_usu:{
        fontSize:12,
        backgroundColor:'rgba(255,255,255,0.2)',
        borderRadius:10
    },
    input_buscar_usu:{
        backgroundColor:'white',
        fontSize:16,
        flexDirection:'row',
        margin:3,
        borderColor:'#40DDF3',
        borderWidth:1,
        borderRadius:10,
        textAlign:'center',
        width:dimension('W',150)
    },
    icon_usu:{
        width:50,
        height:50,
        borderRadius:15,
        overflow:'hidden'
    },
    search_bar:{
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'stretch'
    },
    buton_search:{
        backgroundColor:'skyblue',
        width:30,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    contenedor_preview:{
        borderRadius:15,
        width:300,
        height:250,
        alignSelf:'center',
        position:'absolute',
        borderColor:'white',
        borderWidth:1,
        flexDirection:'row',
        top:20,
        overflow:'hidden'
    },
    image_preview:{
        width:100,
        height:100,
        borderRadius:10,
        overflow:'hidden',
        marginRight:5
    },
    options_preview:{
        backgroundColor:'rgba(255,255,255,0.3)',
        flexDirection:'row',
        width:180,
        borderRadius:20,
        justifyContent:'space-between'
    },
    options_preview_b:{
        flexDirection:'row',
        height:50,
        width:180,
        borderRadius:20,
        justifyContent:'space-between'
    },
    content_preview:{
        flexDirection:'row',
        alignSelf:'flex-end',
        margin:5,
        alignItems:'center'
    },
    cancel_preview:{
        position:'absolute',
        left:258
    },
    contenedor_solicitudes:{
        backgroundColor:''
    },
    scrollview_solicitudes:{
        height:200
    },
    texto_solicitudes:{
        fontSize:17,
        fontWeight:'bold',
        color:'white',
        left:10,
        marginTop:10
    },
    options_solicitudes:{
        flexDirection:'row'
    },
    /*--Usuarios.js END--*/
    /*--Perfil.js BEGIN--*/
    circle_cont_usu:{
        flex:0.50,
        justifyContent:'center',
        alignItems:'center'
    },
    circle_usu:{
        backgroundColor:'white',
        width:120,
        height:120,
        borderRadius:100,
        alignItems:'center',
        marginBottom:10,
        borderColor:'#40DDF3',
        borderWidth:2,
        overflow:'hidden',
        alignSelf:'flex-start',
        left:10
    },
    target_usuarios:{
        backgroundColor:'white',
        width:173,
        height:100,
        borderRadius:10,
        alignItems:'center',
        marginTop:5,
        marginLeft:15,
        justifyContent:'center',
        overflow:'hidden'
    },
    edit_portada:{
        backgroundColor:'rgba(255,255,255,0.15)',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        alignSelf:'flex-end',
        right:10,
        top:10
    },
    editar_perfil:{
        color:'#10A1DC',
        fontSize:17,
        fontWeight:'bold'
    },
    button_opt_usu:{
        backgroundColor:'rgba(255,255,255,0.15)',
        borderRadius:50,
        width:145,
        height:39,
        alignItems:'center',
        justifyContent:'center',
        marginTop:25,
        marginBottom:10
    },
    ventana_modal:{
        width:300,
        height:350,
        backgroundColor:'white',
        borderRadius:20,
        top:30,
        justifyContent:'center',
        alignItems:'center'
    },
    btn_perfil_update:{
        width:100,
        height:40,
        borderRadius:5,
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#0B2379',
        borderWidth:2
    },
    buton_row_perfil:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    /*--Perfil.js END--*/
    /*Menu lateral-- */
    contenedor_chats:{
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor:'#0B2379'
    },
    button_menu_container:{
        width:45,
        height:45,
        justifyContent:'center',
        alignItems:'center'
    },
    contenedor_general_chats:{
        flex:1,
        flexDirection:'row'
    },
    contenedor_menu:{
        flex:0.5,
        flexDirection:'column',
        alignItems:'center',
        position:'absolute',
        alignSelf:'flex-end',
        right:0,
        backgroundColor:'red',
        borderTopLeftRadius:15
    },
    menu_content:{
        flex:0.5,
        alignSelf:'flex-end'
    },
    contenedor_boton_menu:{
        backgroundColor:'rgba(0,0,0,0.25)',
        borderRadius:15,
        margin:5,
        justifyContent:'center'
    },
    contenedor_boton_menu_del:{
        backgroundColor:'rgba(179,2,46,0.25)',
        borderRadius:15,
        margin:5,
        justifyContent:'center'
    },
    /*Menu lateral end */
    /*Publicaciones Begin */
    contenedor_publicaciones:{
        flex:1,
        flexDirection:'row'
    },
    contenedor_publicacion:{
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor:'#0B2379'
    },
    tarjeta_public_cont:{
        width:dimension('W',115),
        height:dimension('H',230),
        backgroundColor:'white',
        marginTop:5,
        alignItems:'center',
        borderRadius:10,
        flexDirection:'column'
    },
    image_public:{
        marginTop:5,
        flexDirection:"column",
        backgroundColor:'skyblue',
        width:dimension('W',90),
        height:dimension('H',73)
    },
    header_public:{
        marginTop:5,
        flexDirection:"row",
        width:dimension('W',106),
        height:dimension('H',15)
    },
    footer_public:{
        marginTop:5,
        flexDirection:"row",
        width:dimension('W',100),
        height:dimension('H',100)
    },
    contenedor_profile_public:{
        flexDirection:"column",
        alignItems:'center',
        justifyContent:'center'
    },
    image_profile_public:{
        width:50,
        height:50,
        backgroundColor:'green',
        borderRadius:100
    },
    text_name_profile_public:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:5
    },
    footer_buttons:{
        width:50,
        height:50,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center'
    },
    descrip_public:{
        alignSelf:'flex-start',
        textAlign:'justify',
        left:17,
        fontSize:16,
        maxWidth:dimension('W',95)
    },
    newPost:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    form_newpost:{
        width:dimension('W',100),
        height:dimension('H',800),
        backgroundColor:'white',
        borderRadius:10,
        flexDirection:'column',
        overflow:'hidden'
    },
    header_newpost:{
        backgroundColor:'#0B2379',
        height:dimension('H',25)
    },
    body_newpost:{
        height:dimension('H',255)
    },
    footer_newpost:{
        backgroundColor:'#0B2379'
    },
    image_newpost:{
        width:dimension('W',100),
        height:dimension('H',100),
        backgroundColor:'skyblue',
        position:'absolute'
    },
    texto_header_newpost:{
        color:'white',
        marginTop:10,
        left:10,
        fontWeight:'bold',
        fontSize:17
    },
    input_newpost:{
        width:dimension('W',100),
        height:dimension('H',30),
        backgroundColor:'white'
    }
    /*Publicaciones end */
});
export default{
    styles
};