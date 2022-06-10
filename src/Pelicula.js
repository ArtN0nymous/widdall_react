import { Text, Image, TouchableOpacity, View, StyleSheet } from "react-native";
export default function Pelicula({titulo, descrip, image}){
    var pelicula_imagen={
        'minions.jpg':require('./img/minions.jpg'),
        'la-era-de-hielo.jpg':require('./img/la-era-de-hielo.jpg'),
        'Avengers-era-de-ultron.jpg':require('./img/Avengers-era-de-ultron.jpg'),
        'Avengers-Infinity-War.jpg':require('./img/Avengers-Infinity-War.jpg'),
        'detective-pikachu.jpg':require('./img/detective-pikachu.jpg')
    }
    var url_imagen = pelicula_imagen[image];
    return(
        <>
            <TouchableOpacity style={styles.contenedor} activeOpacity={0.6}>
                <View style={styles.tarjeta}>
                    <View style={styles.desc}>
                        <Text style={{fontSize:25, color:'white', fontWeight:'bold'}}>{titulo}</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:10}}>
                        <Image  source={url_imagen} style={{width:100,height:100, borderRadius:12, marginRight:5}}/>
                        <Text style={{color:'white', textAlign:'justify', maxWidth:150}}>{descrip}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}
const styles = StyleSheet.create({
    contenedor:{flexDirection:'column', alignItems:'center', justifyContent:'center', maxHeight:300},
    tarjeta:{width:300,height:200,backgroundColor:'#021D5F', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:10, borderRadius:13, borderWidth:2, borderColor:'white'},
    desc:{justifyContent:'center', alignItems:'center'}
});