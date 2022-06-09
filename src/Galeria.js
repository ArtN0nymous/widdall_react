import { View, StyleSheet, Text } from "react-native";
import Pelicula from "./Pelicula";
export default function Galeria(){
    var peliculas =[
        {
            nombre:'Detective Pikachu',
            desc:'LIUAHDUIGYASFUDY',
            url :'https://youtube.com',
            src:'./img/detective-pikachu.jpg'
        },
        {
            nombre:'Avengers Infinity War',
            desc:'LIUAHDUIGYASFUDY',
            url :'https://youtube.com',
            src:'./img/Avengers-Infinity-War.jpg'
        },
        {
            nombre:'Avengers Era de Ultron',
            desc:'LIUAHDUIGYASFUDY',
            url :'https://youtube.com',
            src:'./img/Avengers-era-de-ultron.jpg'
        },
        {
            nombre:'La era de hielo',
            desc:'LIUAHDUIGYASFUDY',
            url :'https://youtube.com',
            src:'./img/la-era-de-hielo.jpg'
        },
        {
            nombre:'Minions',
            desc:'LIUAHDUIGYASFUDY',
            url :'https://youtube.com',
            src:'./img/minions.jpg'
        }
    ];
    // var galeria ='';
    // peliculas.forEach(element => {
    //     galeria+=`<Text>${element.nombre}</Text>`;
    // });
    return(
        <>
            {peliculas.map((p)=>(
                <Text>
                    <Pelicula titulo={p.nombre} descrip={p.desc} image={p.src}/>
                </Text>
            ))}
        </>
    );
}
const styles = StyleSheet.create({
    contenedor:{
        flex:1
    }
});