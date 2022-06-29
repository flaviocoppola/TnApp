import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const CustomDrwer = (props) => {
    const [name, setName] = useState('');
  
    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      try {
        await AsyncStorage.getItem('userData').then(value => {
          if (value != null) {
            let user = JSON.parse(value);
            setName(user.name);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <View style={styles.container}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={styles.contentContainer}>
          <View>
            <View style={styles.userIcon}>
              <Text style={styles.iconText}>{name.match(/\b(\w)/g)}</Text>
            </View>
          </View>
          <View style={styles.routeContainer}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
      </View>
    );
  };
  
  export default CustomDrwer;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    userIcon: {
      height: 80,
      width: 80,
      borderRadius: 100,
      backgroundColor: '#e20613',
      marginTop: 30,
      marginLeft: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: 'white'
    },
    contentContainer: {
    },
    routeContainer: {
      flex: 1,
      marginTop: 20,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    footer: {
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
  });
  