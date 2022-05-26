import { View, Text, StyleSheet} from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";

export default function Icons(){
    return(
        <View style={styles.contenedor}>
            <Text>Iconos</Text>
            <FontAwesome5 name='hotdog' size={50} color='blue'/>
        </View>
    );
}
const styles = StyleSheet.crate({
    contenedor:{
        backgroundColor:'#53F903',
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:"center"
    }
});