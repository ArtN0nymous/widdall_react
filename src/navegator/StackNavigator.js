// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import {NavigationContainer} from 'react-navigation'; 
//import {createStackNavigator} from 'react-navigation-stack';
import HolaMundo from '../HolaMundo';
import Galeria from '../Galeria';
import Imagenes from '../Imagenes';
import Interfaz from '../Interfaz';
import InfoPersona from '../InfoPersona';
import Formularios from '../Formularios';
import Estado from '../Estado';
import Login from '../Login';
import Registro from '../Registro';
import BandejaChats from '../BandejaChats';
import BandejaMessages from '../BandejaMessages';
import Usuarios from '../Usuarios';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

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
        <Stack.Screen options={{tittle:'Inicio'}} name="holamundo" component={HolaMundo} />
        <Stack.Screen options={{tittle:'Galeria'}} name="Galeria" component={Galeria} />
        <Stack.Screen name="Interfaz" component={Interfaz} />
        <Stack.Screen name="Imagenes" component={Imagenes} />
        <Stack.Screen name='Infopersona' component={InfoPersona}/>
        <Stack.Screen name='Formularios' component={Formularios}/>
        <Stack.Screen name='Estado' component={Estado}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Registro' component={Registro}/>
        <Stack.Screen name='Chats' component={BandejaChats}/>
        <Stack.Screen name='Messages' component={BandejaMessages}/>
        <Stack.Screen name='Usuario' component={Usuarios}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;