import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import base64 from 'base-64';
import {MaterialIndicator} from 'react-native-indicators';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {UNAME, PWORD, APIBORD} from '@env'
import Item from '../../components/ItemBorder';
import styles from './Bordero.style';

class DetailsCompN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filiale: '',
      anno: '',
      numero: '',
      data: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getData();
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
      const filterData = this.state.data.filter(function(item) {
        return item.CONSEGNATA === 'S';
      });
      this.setState({data: filterData});
      // console.log(this.state.data)
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false});
    }
  };

  completaViaggio = async () => {
    await AsyncStorage.clear();
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
    />
  );

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.isLoading ? (
          <MaterialIndicator />
        ) : (
          <>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnDetail} onPress={() => this.completaViaggio()}>
              <Icon name="logout" size={36} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDetail} onPress={() => this.getData()} >
              <Icon name="sync" size={36} color="white" />
            </TouchableOpacity>
          </View>
            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={item => item.NUMERO}
            />
          </>
        )}
      </View>
    );
  }
}

export default DetailsCompN;
