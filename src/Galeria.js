import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native";
import Pelicula from "./Pelicula";
export default function Galeria(){
    var peliculas =[
        {
            nombre:'Detective Pikachu',
            desc:'LIUAHDUIGYASFUDY',
            url :'https://youtube.com',
            src:'detective-pikachu.jpg'
        },
        {
            nombre:'Avengers Infinity War',
            desc:'LIUAHDUIGYASFUDY',
            url :'https://youtube.com',
            src:'Avengers-Infinity-War.jpg'
        },
        {
            nombre:'Avengers Era de Ultron',
            desc:'LIUAHDUIGYASFUDY',
            url :'https://youtube.com',
            src:'Avengers-era-de-ultron.jpg'
        },
        {
            nombre:'La era de hielo',
            desc:'LIUAHDUIGYASFUDY',
            url :'https://youtube.com',
            src:'la-era-de-hielo.jpg'
        },
        {
            nombre:'Minions',
            desc:'LIUAHDUIGYASFUDY',
            url :'https://youtube.com',
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
                {peliculas.map((p,i)=>(
                    <Text>
                        <Pelicula key={i} titulo={p.nombre} descrip={p.desc} image={p.src}/>
                    </Text>
                ))}
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    contenedor:{
        flex:1
    }
});