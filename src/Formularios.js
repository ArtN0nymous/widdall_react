import { View, StyleSheet, TextInput, Text } from "react-native";

export default function Formularios(){
    return(
        <>
        <View style={style.contenedor}>
            <Text style={style.labels}>Texbox 1</Text>
            <TextInput style={style.inputs} placeholder="Vaya" keyboardType="default" placeholderTextColor="red" autoCapitalize="words"
            autoCorrect={true} autoFocus={true} editable={true} maxLength={100} multiline={true}/>
            <TextInput style={style.inputs} placeholder="Vaya" keyboardType="email-address" placeholderTextColor="red"/>
            <TextInput style={style.inputs} placeholder="Vaya" keyboardType="phone-pad" placeholderTextColor="red" contextMenuHidden={true}/>
        </View>
        </>
    );
}

const style = StyleSheet.create({
    contenedor:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black'
    },
    inputs:{
        fontSize:20,
        color:'green',
        backgroundColor:'black',
        borderColor:'green',
        borderWidth:3,
        borderRadius:10,
        width:200,
        height:30,
        textAlign:'center',
        marginTop:10
    },
    labels:{
        color:'green',
        fontSize:30
    }
});