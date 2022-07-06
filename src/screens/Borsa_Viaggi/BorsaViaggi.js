import React, {Component} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import base64 from 'base-64';
import {concat} from 'react-native-reanimated';
import {MaterialIndicator} from 'react-native-indicators';
import styles from './BorsaViaggi.style';
import ItemBorsaViaggio from '../../components/ItemBorsaViaggio';
import {APIURL, USER, PASS} from '@env'

class BorsaViaggi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      isFetching: false,
    };
  }

  async getViaggi() {
    try {
      const user = USER;
      const pass = PASS;
      console.log(user, pass)
      const response = await fetch(APIURL, {
        headers: {
          Authorization: 'Basic ' + base64.encode(USER + ':' + PASS),
        },
      });
      const json = await response.json();
      this.setState({data: json.array});
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({isLoading: false});
      this.setState({isFetching: false});
    }
  }

  onRefresh() {
    this.setState({isFetching: true}, () => {
      this.getViaggi();
    });
  }

  componentDidMount() {
    this.getViaggi();
  }

  renderItem = ({item}) => (
    <ItemBorsaViaggio
      ID={concat(item.Viaggio.ANNO, item.Viaggio.NUMERO, item.Viaggio.FILIALE)}
      ANNO={item.Viaggio.ANNO}
      FILIALE={item.Viaggio.FILIALE}
      NUMERO={item.Viaggio.NUMERO}
      CODICE={item.Viaggio.CODICE}
      RAGIONE_SOCIALE={item.Viaggio.RAGIONE_SOCIALE}
      IMPORTO_TOTALE={item.Viaggio.IMPORTO_TOTALE}
      CARICO_DATA_ORA_EFFETTIVA={item.Viaggio.CARICO_DATA_ORA_EFFETTIVA}
      CARICO_LOCALITA={item.Viaggio.CARICO_LOCALITA}
      CARICO_ZONA={item.Viaggio.CARICO_ZONA}
      CARICO_NAZIONE={item.Viaggio.CARICO_NAZIONE}
      SCARICO_DATA_ORA_EFFETTIVA={item.Viaggio.SCARICO_DATA_ORA_EFFETTIVA}
      SCARICO_LOCALITA={item.Viaggio.SCARICO_LOCALITA}
      SCARICO_ZONA={item.Viaggio.SCARICO_ZONA}
      SCARICO_NAZIONE={item.Viaggio.SCARICO_NAZIONE}
      Email={item.Viaggio.Email}
      Merci={item.Viaggio.Merci[0].MERCE_DESCRIZIONE}
      UM_1_VALORE={item.Viaggio.Merci[0].UM_1_VALORE}
      UM_1_CODICE={item.Viaggio.Merci[0].UM_1_CODICE}
    />
  );

  render() {
    const {data, isLoading} = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.activityContainer}>
            <MaterialIndicator />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => item.Viaggio.ID}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
          />
        )}
      </View>
    );
  }
}

export default BorsaViaggi;
