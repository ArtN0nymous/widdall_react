import {View,Text,ImageBackground} from 'react-native';
import CSS from './Styles';
import {useState} from 'react';
import { Dimensions } from 'react-native';
export default function Message({user,mensaje,tipo,hora,img}){
    var styles = CSS.styles;
    var color = 'rgba(9,69,220,0.98)';
    if(tipo!='1'){
        color = 'rgba(68,31,161,0.98)';
    }
    var stilo = {
        backgroundColor:color,
        borderRadius:11,
        left:10,
        width:(Dimensions.get('screen').width*50)/100,
        borderColor:'black',
        borderWidth:1
    }
    const estilo2 ={
        backgroundColor:color,
        borderRadius:11,
        left:10,
        width:(Dimensions.get('screen').width*70)/100,
        borderColor:'black',
        borderWidth:1
    }
    var estilo_tipo_2= {
        backgroundColor:color,
        borderRadius:11,
        width:(Dimensions.get('screen').width*50)/100,
        alignSelf:'flex-end',
        right:10,
        borderColor:'black',
        borderWidth:1
    }
    const estilo2_tipo2 ={
        backgroundColor:color,
        borderRadius:11,
        alignSelf:'flex-end',
        right:10,
        width:(Dimensions.get('screen').width*70)/100,
        borderColor:'black',
        borderWidth:1
    }
    if(mensaje.length>20){
        stilo=estilo2;
        estilo_tipo_2 = estilo2_tipo2;
    }
    if(tipo=='1' && img!=''){
        if(mensaje.length>20){
            return(
                <>
                <View style={styles.contenedor_message}>
                    <View style={styles.triangle_left_message}/>
                    <View style={[stilo,{overflow:'hidden',zIndex:2}]}>
                        <ImageBackground style={{width:(Dimensions.get('screen').width*69)/100,height:150,alignSelf:'center'}} source={{uri:img}}/>
                        <Text style={styles.texto_message}>{mensaje}</Text>
                        <Text style={styles.hora_message}>{hora}</Text>
                    </View>
                </View>
                </>
            );
        }else if(mensaje.length<1){
            return(
                <>
                <View style={styles.contenedor_message}>
                    <View style={styles.triangle_left_message}/>
                    <View style={[stilo,{overflow:'hidden',zIndex:2}]}>
                        <ImageBackground style={{width:(Dimensions.get('screen').width*49)/100,height:100,alignSelf:'center'}} source={{uri:img}}/>
                    </View>
                </View>
                </>
            );
        }else{
            return(
                <>
                <View style={styles.contenedor_message}>
                    <View style={styles.triangle_left_message}/>
                    <View style={[stilo,{overflow:'hidden',zIndex:2}]}>
                        <ImageBackground style={{width:(Dimensions.get('screen').width*49)/100,height:100,alignSelf:'center'}} source={{uri:img}}/>
                        <Text style={styles.texto_message}>{mensaje}</Text>
                        <Text style={styles.hora_message}>{hora}</Text>
                    </View>
                </View>
                </>
            );
        }
    }else if(tipo=='2'&&img!=''){
        if(mensaje.length>20){
            return(
                <>
                <View style={styles.contenedor_message}>
                    <View style={[estilo_tipo_2,{overflow:'hidden',zIndex:2}]}>
                        <ImageBackground style={{width:(Dimensions.get('screen').width*69)/100,height:150,alignSelf:'center'}} source={{uri:img}}/>
                        <Text style={styles.texto_message}>{mensaje}</Text>
                        <Text style={[styles.hora_message,{textAlign:'right'}]}>{hora}</Text>
                    </View>
                    <View style={styles.triangle_right_message}/>
                </View>
                </>
            );
        }else if(mensaje.length<1){
            return(
                <>
                <View style={styles.contenedor_message}>
                    <View style={[estilo_tipo_2,{overflow:'hidden',zIndex:2}]}>
                        <ImageBackground style={{width:(Dimensions.get('screen').width*49)/100,height:100,alignSelf:'center'}} source={{uri:img}}/>
                    </View>
                    <View style={styles.triangle_right_message}/>
                </View>
                </>
            );
        }else{
            return(
                <>
                <View style={styles.contenedor_message}>
                    <View style={[estilo_tipo_2,{overflow:'hidden',zIndex:2}]}>
                        <ImageBackground style={{width:(Dimensions.get('screen').width*49)/100,height:100,alignSelf:'center'}} source={{uri:img}}/>
                        <Text style={styles.texto_message}>{mensaje}</Text>
                        <Text style={[styles.hora_message,{textAlign:'right'}]}>{hora}</Text>
                    </View>
                    <View style={styles.triangle_right_message}/>
                </View>
                </>
            );
        }
    }else if(tipo==2&&img==''){
        return(
            <>
            <View style={styles.contenedor_message}>
                <View style={estilo_tipo_2}>
                    <Text style={styles.texto_message}>{mensaje}</Text>
                    <Text style={[styles.hora_message,{textAlign:'right'}]}>{hora}</Text>
                </View>
                <View style={styles.triangle_right_message}/>
            </View>
            </>
        );
    }else if(tipo==1&&img==''){
        return(
            <>
            <View style={styles.contenedor_message}>
                <View style={styles.triangle_left_message}/>
                <View style={stilo}>
                    <Text style={styles.texto_message}>{mensaje}</Text>
                    <Text style={styles.hora_message}>{hora}</Text>
                </View>
            </View>
            </>
        );
    }
}