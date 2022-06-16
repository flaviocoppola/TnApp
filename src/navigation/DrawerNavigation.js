import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Appearance } from 'react-native';

import CustomDrwer from './CustomDrawer';
import Home from '../screens/Home/Home';
import BorsaViaggi from '../screens/Borsa_Viaggi/BorsaViaggi';
import Settings from '../screens/Settings/Settings';
import StackNavigationBordero from './StackNavigationBordero';

const Drawer = createDrawerNavigator();

function DrawerNavigation () {

    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrwer {...props} />}
        
        screenOptions={{headerTintColor: 'black'}}
        >
        <Drawer.Screen
          component={Home}
          name="Home"
          options={{
            drawerIcon: ({focused}) => (
              <Icon
                name="home"
                size={focused ? 25 : 20}
                color={focused ? '#0080ff' : '#9999'}
              />
            ),
          }}
        />
        <Drawer.Screen
          component={BorsaViaggi}
          name="Borsa Viaggi"
          options={{
            drawerIcon: ({focused}) => (
              <Icon
                name="explore"
                size={focused ? 25 : 20}
                color={focused ? '#0080ff' : '#9999'}
              />
            ),
          }}
        />
        <Drawer.Screen
          component={StackNavigationBordero}
          name="Borderò"
          options={{
            drawerIcon: ({focused}) => (
              <Icon
                name="local-shipping"
                size={focused ? 25 : 20}
                color={focused ? '#0080ff' : '#9999'}
              />
            ),
          }}
        />
        <Drawer.Screen
          component={Settings}
          name="Impostazioni"
          options={{
            drawerIcon: ({focused}) => (
              <Icon
                name="settings"
                size={focused ? 25 : 20}
                color={focused ? '#0080ff' : '#9999'}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }

export default DrawerNavigation;
