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
        <Stack.Screen options={{tittle:'inicio'}} name="holamundo" component={HolaMundo} />
        <Stack.Screen options={{tittle:'galeria'}} name="galeria" component={Galeria} />
        <Stack.Screen name="interfaz" component={Interfaz} />
        <Stack.Screen name="imagenes" component={Imagenes} />
        <Stack.Screen name='infopersona' component={InfoPersona}/>
        <Stack.Screen name='formularios' component={Formularios}/>
        <Stack.Screen name='Estado' component={Estado}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;