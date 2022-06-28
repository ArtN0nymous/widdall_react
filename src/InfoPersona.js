import { View, Text, Button } from "react-native";

export default function InfoPersona({route,navigation}){
    const { Nombre, Bebida } = route.params;
    navigation.setOptions({ title:Nombre })
    return(
        <>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:30}}>Nombre: {JSON.stringify(Nombre)}</Text>
            <Text style={{fontSize:30}}>Bebida: {JSON.stringify(Bebida)}</Text>
            <Button title="Regresar" color='yellow' onPress={() => navigation.goBack()} />
        </View>
        </>
    );
}