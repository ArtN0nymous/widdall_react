import { View } from "react-native";

export default function infoPersona({route,navigation}){
    const { Nombre, Bebida } = route.params;
    return(
        <>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>Nombre: {JSON.stringify(Nombre)}</Text>
            <Text>Bebida: {JSON.stringify(Bebida)}</Text>
            <Button title="Regresar" color='yellow' onPress={() => navigation.goBack()} />
        </View>
        </>
    );
}