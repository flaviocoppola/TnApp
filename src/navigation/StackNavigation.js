import React, { Component } from 'react';
import { View, Text, Appearance } from 'react-native';
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Auth from '../screens/Auth/Auth'
import DrawerNavigation from './DrawerNavigation';

const Stack = createNativeStackNavigator();

function StackNavigation () {

  const [theme, setTheme] = React.useState(Appearance.getColorScheme());

    return (
      // <NavigationContainer theme={theme === 'light' ? DefaultTheme : DarkTheme}>  possibilità di cambiare il tema a seconda della modalità di sistema utilizzata
      <NavigationContainer theme={DefaultTheme}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name='Auth' component={Auth} />
              <Stack.Screen name='Main' component={DrawerNavigation} />
          </Stack.Navigator>
      </NavigationContainer>
    );
  }

export default StackNavigation;
