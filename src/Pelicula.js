import { Text, Image } from "react-native";
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
            <Text>{titulo}</Text>
            <Text>{descrip}</Text>
            <Image  source={url_imagen} style={{width:30,height:30}}/>
        </>
    )
}