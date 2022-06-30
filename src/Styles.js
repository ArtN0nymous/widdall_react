import { StyleSheet } from "react-native";
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
        justifyContent:'flex-start'
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
        borderColor:'#61DAF9',
        borderRadius:10,
        marginTop:10,
        marginRight:40,
        marginLeft:40,
        borderWidth:2,
        color:'blue'
    },
    boton_login:{
        width:90,
        height:40,
        backgroundColor:'black',
        borderColor:'#4DD6F8',
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
        borderColor:'blue',
        borderWidth:2,
        borderRadius:20,
        textAlign:'center',
        width:200,
        marginTop:10,
        backgroundColor:'rgba(0,0,0,0.15)',
        color:'#532FF1',
        fontWeight:'bold'
    },
    texts_regist:{
        fontSize:10,
        color:'white',
        fontWeight:'bold'
    },
    login_btn_regist:{
        width:70,
        height:35,
        borderRadius:10,
        marginTop:50,
        justifyContent:'center',
        alignItems:'center',
    }
    /*Registro.js END--*/
});
export default{
    styles
};