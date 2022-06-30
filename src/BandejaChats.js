import { LinearGradient } from "expo-linear-gradient";
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Chat from "./Chat";
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
export default function BandejaChats({navigation}){
    const img = require('./img/default_profile.jpg');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);
    var chats = [
        {
            usuario:'Usuario',
            mensaje:'Ejemplo de mensaje',
            img:''
        }
    ];
    return(
        <>
            <View style={styles.contenedor}>
                <ScrollView>
                    { 
                        chats.map((p)=>(
                            <TouchableOpacity onPress={()=>navigation.push('Messages')} activeOpacity={0.6}>
                                <Chat key={p.usuario} usuario={p.usuario} mensaje={p.mensaje}/>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
            </View>
        </>
    );
}
const styles=StyleSheet.create({
    contenedor:{
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor:'blue'
    }
});