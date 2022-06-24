import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Button, Alert} from 'react-native';
import base64 from 'base-64';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MaterialIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';

import {UNAME, PWORD, APIBORD, API_IMPEGNO } from '@env'
import styles from './Bordero.style';

class Bordero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      anno: '',
      filiale: '',
      numero: '',
      email: '',
      checkImpegno: '',
    };
  }

  componentDidMount() {
    this.verificaSelezione();
    this.getDataUtente();
  }

  getDataUtente = async () => {
    AsyncStorage.getItem('userData').then(value => {
      let user = JSON.parse(value);
      this.setState({email: user.email});
      console.log(this.state.email)
    })
  };

  getViaggi = async () => {
    try {
      this.setState({isLoading: true});
      const APIURL = `${APIBORD}&VIAGGIOANNO=${this.state.anno}&VIAGGIOFILIALE=${this.state.filiale}&VIAGGIONUMERO=${this.state.numero}&paramEmailError=p.soglia%40tntorello.com&showform=submit`;

      const user = UNAME;
      const pass = PWORD;
      const response = await fetch(APIURL, {
        headers: {
          Authorization: 'Basic ' + base64.encode(user + ':' + pass),
        },
      });
      const json = await response.json();
      this.setState({data: json});
      // console.log(this.state.data["VIAGGIO"]["SPEDIZIONE"][0]["UTENTE"]);
      if(this.state.data["VIAGGIO"]["SPEDIZIONE"][0]["UTENTE"]){
        this.setState({checkImpegno: json["VIAGGIO"]["SPEDIZIONE"][0]["UTENTE"]});
        console.log(this.state.checkImpegno);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false});
    }

  };

  impegnaViaggio =  () => {
    const API = `${API_IMPEGNO}?Utente=${this.state.email}&VIAGGIOANNO=${this.state.anno}&VIAGGIOFILIALE=${this.state.filiale}&VIAGGIONUMERO=${this.state.numero}&paramEmailError=f.coppola%40tntorello.com%2C+p.soglia%40tntorello.com&showform=submit`;
    const user = UNAME;
    const pass = PWORD;
    try {
      const response = fetch(API, {
        headers: {
          Authorization: 'Basic ' + base64.encode(user + ':' + pass),
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    this.selezionaViaggio()
  };

  selezionaViaggio = async () => {
    await AsyncStorage.setItem('filiale', this.state.filiale);
    await AsyncStorage.setItem('anno', this.state.anno);
    await AsyncStorage.setItem('numero', this.state.numero);
    this.props.navigation.dispatch(StackActions.replace('Viaggio'));
  };

  verificaSelezione = async () => {
    await AsyncStorage.getItem('filiale').then(value => {
      if (value != null) {
        this.props.navigation.dispatch(StackActions.replace('Viaggio'));
      }
    });
  };

  clear = () => {
    this.setState({data: ''})
    this.setState({checkImpegno: ''})
  }

  render() {
    const {data, isLoading, checkImpegno, email} = this.state;
    if(checkImpegno && checkImpegno !== email){
      return (
        <View style={styles.container}>
          <Icon name="hourglass-bottom" size={40} color="black" />
          <Text style={styles.title}>Viaggio in corso</Text>
          <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => this.clear()}>
              <Icon name="cancel" size={27} color="white" />
              <Text style={{color: 'white'}}>Annulla</Text>
            </TouchableOpacity>
        </View>
      )
    } else if (checkImpegno && checkImpegno === email){
      return (
        <View style={styles.container}>
          <Icon name="play-circle-fill" size={40} color="black" />
          <Text style={styles.title}>Continua il viaggio</Text>
          <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => this.impegnaViaggio()}>
              <Icon name="check-circle" size={27} color="white" />
              <Text style={{color: 'white'}}>Vai al viaggio</Text>
            </TouchableOpacity>
        </View>
      )

    }
    else if (isLoading) {
      return (
        <View style={styles.indicatorContainer}>
          <MaterialIndicator />
        </View>
      );
    } else if (!isLoading && data.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Ricerca il numero di viaggio</Text>
          <View style={styles.searchSection}>
            <Icon
              name="calendar-today"
              style={styles.searchIcon}
              size={20}
              color="#000"
            />
            <TextInput
              style={styles.input}
              placeholder="Anno"
              autoCapitalize="none"
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onChangeText={newText => this.setState({anno: newText})}
              defaultValue={this.state.anno}
              placeholderTextColor="#424242"
            />
          </View>

          <View style={styles.searchSection}>
            <Icon
              name="home"
              style={styles.searchIcon}
              size={20}
              color="#000"
            />
            <TextInput
              style={styles.input}
              placeholder="Filiale"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={newText => this.setState({filiale: newText})}
              defaultValue={this.state.filiale}
              placeholderTextColor="#424242"
            />
          </View>

          <View style={styles.searchSection}>
            <Icon
              name="confirmation-number"
              style={styles.searchIcon}
              size={20}
              color="#000"
            />
            <TextInput
              style={styles.input}
              placeholder="Numero"
              keyboardType="numeric"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={newText => this.setState({numero: newText})}
              defaultValue={this.state.numero}
              placeholderTextColor="#424242"
            />
          </View>

          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => this.getViaggi()}>
            <Icon name="search" size={27} color="white" />
            <Text style={{color: 'white'}}>Cerca</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => this.props.navigation.navigate('BarcodeScanner')}>
            <Icon name="qr-code-2" size={27} color="white" />
            <Text style={{color: 'white'}}>Scansiona </Text>
          </TouchableOpacity>
          {/* <Button title="Test" onPress={() => this.props.navigation.navigate('Camera')} /> */}
        </View>
      );
    } else if (!isLoading && data.VIAGGIO.SPEDIZIONE.length > 0) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.title}>
            Viaggio selezionato: {data.VIAGGIO.VIAGGIO_CONSEGNA_NUMERO}/
            {data.VIAGGIO.VIAGGIO_CONSEGNA_FILIALE}/
            {data.VIAGGIO.VIAGGIO_CONSEGNA_ANNO}
          </Text>
          <Text style={styles.title}>
            Numero spedizioni: {data.VIAGGIO.SPEDIZIONE.length}
          </Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => this.setState({data: ''})}>
              <Icon name="cancel" size={27} color="white" />
              <Text style={{color: 'white'}}>Annulla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => this.impegnaViaggio()}>
              <Icon name="check-circle" size={27} color="white" />
              <Text style={{color: 'white'}}>Vai al viaggio</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (!isLoading && data.VIAGGIO.SPEDIZIONE.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.alert}>Verifica i dati inseriti</Text>
          <View style={styles.searchSection}>
            <Icon
              name="calendar-today"
              style={styles.searchIcon}
              size={20}
              color="#000"
            />
            <TextInput
              style={styles.input}
              placeholder="Anno"
              autoCapitalize="none"
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onChangeText={newText => this.setState({anno: newText})}
              defaultValue={this.state.anno}
            />
          </View>

          <View style={styles.searchSection}>
            <Icon
              name="home"
              style={styles.searchIcon}
              size={20}
              color="#000"
            />
            <TextInput
              style={styles.input}
              placeholder="Filiale"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={newText => this.setState({filiale: newText})}
              defaultValue={this.state.filiale}
            />
          </View>

          <View style={styles.searchSection}>
            <Icon
              name="confirmation-number"
              style={styles.searchIcon}
              size={20}
              color="#000"
            />
            <TextInput
              style={styles.input}
              placeholder="Numero"
              keyboardType="numeric"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={newText => this.setState({numero: newText})}
              defaultValue={this.state.numero}
            />
          </View>

          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => this.getViaggi()}>
            <Icon name="search" size={27} color="white" />
            <Text style={{color: 'white'}}>Cerca</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

export default Bordero;
