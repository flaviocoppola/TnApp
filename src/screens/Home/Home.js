import React, { Component } from 'react';
import {ScrollView, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Home.style'
import Card from '../../components/Card'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
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

  render() {
    const {name} = this.state; 
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.content}>Ciao {name}</Text>
          <Text style={styles.subTitle}>Ecco le sezioni dell'app</Text>
          <Card
            title={'Borsa viaggi'}
            description={
              'Consulta i viaggi disponibili e contattare il responsabile per le informazioni'
            }
            uri={require('../../assets/Image/undraw_Delivery_re_f50b.png')}
          />
          <Card
            title={'Borderò'}
            description={
              'Gestisci i borderò assegnati, esistando le relative spedizioni'
            }
            uri={require('../../assets/Image/undraw_Receipt_re_fre3.png')}
          />
        </View>
      </ScrollView>
    );
  }
}

export default Home;
