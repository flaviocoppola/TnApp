import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import base64 from 'base-64';
import {MaterialIndicator} from 'react-native-indicators';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {UNAME, PWORD, APIBORD, API_IMPEGNO} from '@env';
import Item from '../../components/ItemBorder';
import styles from './Bordero.style';
import SectionList from 'react-native/Libraries/Lists/SectionList';

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
    };
  }

  componentDidMount() {
    this.getData();
  }

  impegnaViaggio =  () => {
    const API = `${API_IMPEGNO}?Utente=&VIAGGIOANNO=${this.state.anno}&VIAGGIOFILIALE=${this.state.filiale}&VIAGGIONUMERO=${this.state.numero}&paramEmailError=f.coppola%40tntorello.com%2C+p.soglia%40tntorello.com&showform=submit`;
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
      console.log(this.state.data);
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

  completaViaggio = async () => {
    await AsyncStorage.removeItem('anno');
    await AsyncStorage.removeItem('filiale');
    await AsyncStorage.removeItem('numero');
    this.impegnaViaggio()
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

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.isLoading ? (
          <MaterialIndicator />
        ) : (
          <>
          {/* <Button title="test" onPress={() => console.log(this.state)} /> */}
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
