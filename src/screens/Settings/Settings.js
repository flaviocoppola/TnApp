import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';

import styles from './Settings.style'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    try {
      AsyncStorage.getItem('userData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          this.setState({email: user.email});
          this.setState({name: user.name});
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  revoke = () => {
    try {
      AsyncStorage.clear();
      this.props.navigation.dispatch(StackActions.replace('Auth'))
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="account-circle" size={120} color='black'/>
          <Text style={styles.text}>{this.state.name}</Text>
          <Text style={styles.text}>{this.state.email}</Text>
        </View>
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.touch}
            onPress={() =>
              Linking.openURL(
                'mailto:dev@tntorello.com?subject=TnApp&body=Ciao,',
              )
            }>
            <Icon name="email" size={50} style={{marginRight: 10}} color='black'/>
            <Text style={styles.text}>Scrivici</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.touch} onPress={() => Linking.openURL('http://net.torellotrasporti.it/')}>
            <Icon name="help" size={50} style={{marginRight: 10}} color='black'/>
            <Text style={styles.text}>Aiuto e supporto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.touch} onPress={() => this.revoke()}>
            <Icon name="logout" size={50} style={{marginRight: 10}} color='black'/>
            <Text style={styles.text}>Esci</Text>
          </TouchableOpacity>
        </View>
        <Text>Copyright © 2022 TorelloDev</Text>
      </View>
    );
  }
}

export default Settings;
