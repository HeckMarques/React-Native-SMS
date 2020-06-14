import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screen/Home'
import Login from './src/screen/Login'
import Mapa from './src/screen/Mapa'



//Desabilitano Warnings
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Setting a timer'])

//Configurando Encondig
import { decode, encode } from 'base-64'
if (!global.btoa) {
  global.btoa = encode
}
if (!global.atob) {
  global.atob = decode
}


export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home" component={Home}
          options={{
            title: 'Map Friends',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Login" component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Mapa" component={Mapa}
          options={{
            title: 'Mapa dos amigos',
            headerTitleAlign: 'center',
            
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}