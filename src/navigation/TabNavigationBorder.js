import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DetailsCompN from '../screens/Borderò/DetailsCompN';
import DetailsCompS from '../screens/Borderò/DetailsCompS';

const Tab = createBottomTabNavigator();

export default function TabNavigationBorder({navigation}) {

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            console.log(e);
        })
    }, [navigation]);

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Incompleti"
        component={DetailsCompN}
        options={{
        //   tabBarBadge: 5,
          tabBarIcon: ({focused}) => (
            <Icon
              name="explore"
              size={focused ? 28 : 25}
              color={focused ? '#0080ff' : '#9999'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Completi"
        component={DetailsCompS}
        options={{
        //   tabBarBadge: 5,
          tabBarIcon: ({focused}) => (
            <Icon
              name="check-circle"
              size={focused ? 28 : 25}
              color={focused ? '#0080ff' : '#9999'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
