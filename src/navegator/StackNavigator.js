// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HolaMundo from '../HolaMundo';
import Galeria from '../Galeria';
import Imagenes from '../Imagenes';
import Interfaz from '../Interfaz';
import infoPersona from '../InfoPersona';

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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="holamundo" component={HolaMundo} />
        <Stack.Screen name="galeria" component={Galeria} />
        <Stack.Screen name="interfaz" component={Interfaz} />
        <Stack.Screen name="imagenes" component={Imagenes} />
        <Stack.Screen name='infopersona' component={infoPersona}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;