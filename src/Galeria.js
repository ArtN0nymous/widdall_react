import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Pelicula from "./Pelicula";
export default function Galeria(){
    var peliculas =[
        {
            nombre:'Detective Pikachu',
            desc:'una serie de imágenes fijas que, cuando se proyectan en una pantalla de forma consecutiva en rápida sucesión, crean la ilusión óptica de imágenes en movimiento.',
            url :'https://www.youtube.com/watch?v=KPmXw7KT33c',
            src:'detective-pikachu.jpg'
        },
        {
            nombre:'Avengers Infinity War',
            desc:'una serie de imágenes fijas que, cuando se proyectan en una pantalla de forma consecutiva en rápida sucesión, crean la ilusión óptica de imágenes en movimiento.',
            url :'https://www.youtube.com/watch?v=KPmXw7KT33c',
            src:'Avengers-Infinity-War.jpg'
        },
        {
            nombre:'Avengers Era de Ultron',
            desc:'una serie de imágenes fijas que, cuando se proyectan en una pantalla de forma consecutiva en rápida sucesión, crean la ilusión óptica de imágenes en movimiento.',
            url :'https://www.youtube.com/watch?v=KPmXw7KT33c',
            src:'Avengers-era-de-ultron.jpg'
        },
        {
            nombre:'La era de hielo',
            desc:'una serie de imágenes fijas que, cuando se proyectan en una pantalla de forma consecutiva en rápida sucesión, crean la ilusión óptica de imágenes en movimiento.',
            url :'https://www.youtube.com/watch?v=KPmXw7KT33c',
            src:'la-era-de-hielo.jpg'
        },
        {
            nombre:'Minions',
            desc:'una serie de imágenes fijas que, cuando se proyectan en una pantalla de forma consecutiva en rápida sucesión, crean la ilusión óptica de imágenes en movimiento.',
            url :'https://www.youtube.com/watch?v=KPmXw7KT33c',
            src:'minions.jpg'
        }
    ];
    // var galeria ='';
    // peliculas.forEach(element => {
    //     galeria+=`<Text>${element.nombre}</Text>`;
    // });
    return(
        <>
            <ScrollView>
                <LinearGradient colors={['#AA03F9','#005FFC','#15051D']} style={styles.contenedor}>
                    {peliculas.map((p,i)=>(
                        <Text>
                            <Pelicula key={i} titulo={p.nombre} descrip={p.desc} image={p.src} url={p.url}/>
                        </Text>
                    ))}
                </LinearGradient>
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    contenedor:{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}
});