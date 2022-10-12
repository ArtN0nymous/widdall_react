// In App.js in a new project

import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
//import {NavigationContainer} from 'react-navigation'; 
//import {createStackNavigator} from 'react-navigation-stack';
import HolaMundo from '../HolaMundo';
import Login from '../Login';
import Registro from '../Registro';
import BandejaChats from '../BandejaChats';
import BandejaMessages from '../BandejaMessages';
import Usuarios from '../Usuarios';
import Perfil from '../Perfil';
import Publicaciones from '../Publicaciones';
import Comentarios from '../Comentarios';
const Stack = createNativeStackNavigator();
function StackNavigator() {
  return (
    <NavigationContainer screenOptions={{
      headerShown:true,
      headerTitleAlign:'center',
      headerStyle:{
        backgroundColor:'tomato'
      },
      headerTitleStyle:{
        color:'white',
        fontWeight:'bold'
      }
    }}>
      <Stack.Navigator>
        <Stack.Screen name='Publicaciones' component={Publicaciones}/>
        <Stack.Screen options={{tittle:'Inicio'}} name="Chats" component={BandejaChats} />
        <Stack.Screen name='Login' component={Login} options={{headerLeft:(props)=><></>, gestureEnabled:false}}/>
        <Stack.Screen name='Registro' component={Registro}/>
        <Stack.Screen name='Messages' component={BandejaMessages}/>
        <Stack.Screen name='Usuario' options={{title:'Amigos'}} component={Usuarios}/>
        <Stack.Screen name='Perfil' component={Perfil}/>
        <Stack.Screen name='Comentarios' component={Comentarios} options={{title:'Comentarios'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;