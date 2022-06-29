import React, {Component} from 'react';
import {
Text,
View,
StyleSheet,Alert,TouchableOpacity
}from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './BarCodeScanner.style';

class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barCode: '',
      anno: '',
      filiale: '', 
      numero: '',
    };
  }

  onBarCodeRead(scanResult) {
    const result = scanResult.data;
    try {
      this.setState({barCode: result});
      const string = new String(result);
      this.setState({anno: 20 + string.substr(3,2)})
      this.setState({filiale: string.substr(5,2)})
      this.setState({numero: string.substr(7,8)})
    } catch (error) {
      console.log(error.message);
    }

  }

  selezionaViaggio = async () => {
    await AsyncStorage.setItem('filiale', this.state.filiale);
    await AsyncStorage.setItem('anno', this.state.anno);
    await AsyncStorage.setItem('numero', this.state.numero);
    this.props.navigation.dispatch(StackActions.replace('Viaggio'));
  };

  render() {
    const {numero, anno, filiale} = this.state
    return (
      <View style={styles.container}>
        {this.state.barCode.length > 0 ? (
          <>
            <View
              style={styles.container}>
              <Text style={styles.title}>
                Viaggio selezionato: {numero}/
                {filiale}/
                {anno}
              </Text>
              <Text style={styles.title}>
              </Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => this.setState({barCode: ''})}>
                  <Icon name="cancel" size={27} color="white" />
                  <Text style={{color: 'white'}}>Annulla</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => this.selezionaViaggio()}>
                  <Icon name="check-circle" size={27} color="white" />
                  <Text style={{color: 'white'}}>Vai al viaggio</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={{flex: 1, width: '100%'}}
              defaultTouchToFocus
              onBarCodeRead={this.onBarCodeRead.bind(this)}
              onFocusChanged={() => {}}
              onZoomChanged={() => {}}
            />
          </>
        )}
      </View>
    );
  }
}

export default BarcodeScanner;

