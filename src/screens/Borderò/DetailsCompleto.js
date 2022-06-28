import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import base64 from 'base-64';
import {MaterialIndicator} from 'react-native-indicators';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {UNAME, PWORD, APIBORD, API_IMPEGNO, RIT} from '@env';
import Item from '../../components/ItemBorder';
import ItemRitiri from '../../components/ItemRitiri';
import styles from './Bordero.style';

class DetailsCompN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filiale: '',
      anno: '',
      numero: '',
      dataS: [],
      dataN: [],
      data: [],
      isLoading: false,
      modalVisible: false,
      ritiro: [],
    };
  }

  componentDidMount() {
    this.getData();
    this.getRitiri();
  }

  getData = async () => {
    await AsyncStorage.getItem('filiale').then(value => {
      if (value != null) {
        this.setState({filiale: value});
      }
    });
    await AsyncStorage.getItem('anno').then(value => {
      if (value != null) {
        this.setState({anno: value});
      }
    });
    await AsyncStorage.getItem('numero').then(value => {
      if (value != null) {
        this.setState({numero: value});
      }
    });
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
      this.setState({data: json['VIAGGIO']['SPEDIZIONE']});
      const filterDataN = this.state.data.filter(function (item) {
        return item.CONSEGNATA === 'N';
      });
      const filterDataS = this.state.data.filter(function (item) {
        return item.CONSEGNATA === 'S';
      });
      this.setState({dataN: filterDataN});
      this.setState({dataS: filterDataS});
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false});
    }
  };

  impegnaViaggio = () => {
    const API = `${API_IMPEGNO}Utente=&VIAGGIOANNO=${this.state.anno}&VIAGGIOFILIALE=${this.state.filiale}&VIAGGIONUMERO=${this.state.numero}&paramEmailError=f.coppola%40tntorello.com%2C+p.soglia%40tntorello.com&showform=submit`;
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
  };

  getRitiri = async () => {
    await AsyncStorage.getItem('filiale').then(value => {
      if (value != null) {
        this.setState({filiale: value});
      }
    });
    await AsyncStorage.getItem('anno').then(value => {
      if (value != null) {
        this.setState({anno: value});
      }
    });
    await AsyncStorage.getItem('numero').then(value => {
      if (value != null) {
        this.setState({numero: value});
      }
    });
    console.log(this.state)
    const user = UNAME;
    const pass = PWORD;
    console.log(this.state)
    const API = `${RIT}EmailErrore=f.coppola%40tntorello.com%2C+p.soglia%40tntorello.com&V_Anno=${this.state.anno}&V_Filiale=${this.state.filiale}&V_Numero=${this.state.numero}&showform=submit`;
    try {
      const response = await fetch(API, {
        headers: {
          Authorization: 'Basic ' + base64.encode(user + ':' + pass),
        },
      });
      const dataRitiri = await response.json();
      this.setState({ritiro: dataRitiri['VIAGGIO']['RITIRO']});
    } catch (error) {
      console.log(error);
    }
  };

  completaViaggio = async () => {
    await AsyncStorage.removeItem('anno');
    await AsyncStorage.removeItem('filiale');
    await AsyncStorage.removeItem('numero');
    this.impegnaViaggio();
    this.props.navigation.dispatch(StackActions.replace('Ricerca'));
  };

  renderItem = ({item}) => (
    <Item
      ANNO={item.ANNO}
      NUMERO={item.NUMERO}
      FILIALE={item.FILIALE}
      RAGIONE_SOCIALE={item.RAGIONE_SOCIALE}
      INDIRIZZO={item.INDIRIZZO}
      PESO_LORDO={item.PESO_LORDO}
      DDT_NUMERO={item.DDT_NUMERO}
      LOCALITA={item.LOCALITA}
      CAP={item.CAP}
      IMPORTO={item.IMPORTO}
      TIPO_INCASSO={item.TIPO_INCASSO}
      STATO_CONTROLLO={item.STATO_CONTROLLO}
      CONSEGNATA={item.CONSEGNATA}
      navigation={this.props.navigation}
      DDT_DATA={item.DDT_DATA}
    />
  );

  renderRitiri = ({item}) => {
    return (
      <ItemRitiri 
      ANNORITIRO={item.ANNORITIRO}
      NUMERORITIRO={item.NUMERORITIRO}
      FILIALERITIRO={item.FILIALERITIRO}
      DATA_ORA_PREVISTA_INIZIO={item.DATA_ORA_PREVISTA_INIZIO}
      MITTENTE={item.MITTENTE}
      M_INDIRIZZO={item.M_INDIRIZZO}
      M_CAP={item.M_CAP}
      M_LOCALITA={item.M_LOCALITA}
      M_PROVINCIA={item.M_PROVINCIA}
      DESTINATARIO={item.DESTINATARIO}
      D_INDIRIZZO={item.D_INDIRIZZO}
      D_CAP={item.D_CAP}
      D_LOCALITA={item.D_LOCALITA}
      D_PROVINCIA={item.D_PROVINCIA}
      />
    )

  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.isLoading ? (
          <MaterialIndicator />
        ) : (
          <>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btnDetail}
                onPress={() => this.completaViaggio()}>
                <Icon name="logout" size={36} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnDetail}
                onPress={() => this.getData()}>
                <Icon name="sync" size={36} color="white" />
              </TouchableOpacity>
            </View>
            {/* <FlatList data={this.state.ritiro} keyExtractor={item => item.NUMERORITIRO} renderItem={this.renderRitiri} /> */}
            <ScrollView>
              <View style={{padding: 5, marginBottom: 10}}>
                <FlatList
                  data={this.state.dataN}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.NUMERO}
                  ListHeaderComponent={() => (
                    <Text style={styles.listHeader}>Da fare</Text>
                  )}
                />
              </View>
              <View style={{padding: 5, marginBottom: 10}}>
                <FlatList
                  data={this.state.ritiro}
                  renderItem={this.renderRitiri}
                  keyExtractor={item => item.NUMERORITIRO}
                  ListHeaderComponent={() => (
                    <Text style={styles.listHeader}>Ritiri</Text>
                  )}
                  style={{padding: 5}}
                />
              </View>
              <View style={{padding: 5, marginBottom: 10}}>
                <FlatList
                  data={this.state.dataS}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.NUMERO}
                  ListHeaderComponent={() => (
                    <Text style={styles.listHeader}>Completi</Text>
                  )}
                  style={{padding: 5}}
                />
              </View>
            </ScrollView>
          </>
        )}
      </View>
    );
  }
}

export default DetailsCompN;
