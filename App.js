import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Contatos from './src/screen/Contatos'
import Login from './src/screen/Login'
import Mapa from './src/screen/Mapa'
import Home from './src/screen/Home'
import Sobre from './src/screen/Sobre'
import Sms from './src/screen/Sms'
import Agendar from './src/screen/Agendar'
import Estrutura from './src/screen/Estrutura'
import Faq from './src/screen/Faq'


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
          name="Login" component={Login}
          options={{
            headerShown: false,
          }}
        />
           <Stack.Screen
          name="Home" component={Home}
          options={{
            title: 'Home',
            headerTitleAlign: 'center',
          }}
        />
          <Stack.Screen
          name="Contatos" component={Contatos}
          options={{
            title: 'Contatos',
            headerTitleAlign: 'center',
          }}
        />
         <Stack.Screen
          name="Estrutura" component={Estrutura}
          options={{
            title: 'Estrutura',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Faq" component={Faq}
          options={{
            title: 'FAQ',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Sobre" component={Sobre}
          options={{
            title: 'Sobre',
            headerTitleAlign: 'center',
          }}
        />
         <Stack.Screen
          name="Sms" component={Sms}
          options={{
            title: 'SMS',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Agendar" component={Agendar}
          options={{
            title: 'Agendar',
            headerTitleAlign: 'center',
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