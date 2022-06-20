import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import React from 'react';

const Item = ({
  ANNO,
  FILIALE,
  NUMERO,
  IMPORTO_TOTALE,
  CODICE,
  RAGIONE_SOCIALE,
  CARICO_LOCALITA,
  CARICO_ZONA,
  CARICO_DATA_ORA_EFFETTIVA,
  CARICO_NAZIONE,
  SCARICO_LOCALITA,
  SCARICO_ZONA,
  SCARICO_DATA_ORA_EFFETTIVA,
  SCARICO_NAZIONE,
  Email,
  Merci,
  UM_1_CODICE,
  UM_1_VALORE,
}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>
        Viaggio: {NUMERO}/{FILIALE}/{ANNO}
      </Text>
      <Text style={styles.content}>
        <Text style={styles.contentTitle}>Cliente: </Text>
        {CODICE} - {RAGIONE_SOCIALE}
      </Text>
      <Text style={styles.content}>
        <Text style={styles.contentTitle}>Importo: </Text>
        {IMPORTO_TOTALE} €
      </Text>
      <Text style={styles.content}>
        <Text style={styles.contentTitle}>Carico: </Text>
        {CARICO_DATA_ORA_EFFETTIVA} {CARICO_LOCALITA} - {CARICO_ZONA} -{' '}
        {CARICO_NAZIONE}
      </Text>
      <Text style={styles.content}>
        <Text style={styles.contentTitle}>Scarico: </Text>
        {SCARICO_DATA_ORA_EFFETTIVA} {SCARICO_LOCALITA} - {SCARICO_ZONA} -{' '}
        {SCARICO_NAZIONE}
      </Text>
      <Text style={styles.content}>
        <Text style={styles.contentTitle}>Merce: </Text>
        {Merci}
      </Text>
      <Text style={styles.content}>
        <Text style={styles.contentTitle}>Quantità: </Text>
        {UM_1_VALORE} - {UM_1_CODICE}
      </Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            Linking.openURL(
              `mailto:${Email}?subject=Viaggio: ${NUMERO}/${FILIALE}/${ANNO}&body=Ciao,`,
            )
          }>
          <Text style={styles.btnText}>Prenotati</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#D2D2CF',
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    color: 'black'
  },
  content: {
    marginTop: 10,
    color: 'black',
  },
  contentTitle: {
    fontWeight: 'bold',
  },
  btn: {
    alignItems: 'center',
    padding: 10,
    width: 200,
    backgroundColor: '#e20613',
    borderRadius: 20,
    marginTop: 20,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
