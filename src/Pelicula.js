import { Text, Image } from "react-native";
export default function Pelicula({titulo, descrip, image}){
    return(
        <>
            <Text>{titulo}</Text>
            <Text>{descrip}</Text>
            <Image  source={required(image)} style={{width:30,height:30}}/>
        </>
    )
}