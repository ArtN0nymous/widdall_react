import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export default function Degradado(){
    return(
        <LinearGradient colors={['#0CD8F9','#0DE194']} style={{flex:1}}>
            <View>
                <Text>Degradado</Text>
            </View>
        </LinearGradient>
    );
}