import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Search from '../screens//BorderĂ²/Search';
import Camera from '../screens/Camera/Camera';
import BarcodeScanner from '../screens/BarCodeScanner/BarCodeScanner';
import DetailsCompleto from '../screens/BorderĂ²/DetailsCompleto';

const Stack = createNativeStackNavigator();

export class StackNavigationBordero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filiale: '',
    };
  }
  getData = async () => {
    await AsyncStorage.getItem('filiale').then(value => {
      if (value != null) {
        this.setState({filiale: value});
      }
    });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Ricerca"
          component={Search}
          options={{
            gestureEnabled: false,
            // headerShown: true,
            headerLeft: () => <></>,
          }}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{
            gestureEnabled: false,
            // headerShown: true,
            headerLeft: () => <></>,
          }}
        />
        <Stack.Screen
          name="BarcodeScanner"
          component={BarcodeScanner}
          options={{
            gestureEnabled: false,
            // headerShown: true,
            headerLeft: () => <></>,
          }}
        />
        {/* <Stack.Screen
          name="Viaggio"
          component={TabNavigationBorder}
          options={{
            gestureEnabled: false,
            // headerShown: true,
            headerLeft: () => <></>,
          }}
        /> */}
        <Stack.Screen
          name="Viaggio"
          component={DetailsCompleto}
          options={{
            gestureEnabled: false,
            // headerShown: true,
            headerLeft: () => <></>,
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default StackNavigationBordero;
