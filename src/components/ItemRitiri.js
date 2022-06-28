import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

const ItemRitiri = ({
  ANNORITIRO,
  FILIALERITIRO,
  NUMERORITIRO,
  DESTINATARIO,
  DATA_ORA_PREVISTA_INIZIO,
  MITTENTE,
  M_INDIRIZZO,
  M_LOCALITA,
  M_CAP,
  M_PROVINCIA,
  D_INDIRIZZO,
  D_LOCALITA,
  D_CAP,
  D_PROVINCIA
}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', borderBottomWidth: 0.3}}>
        <Icon
          name="local-shipping"
          size={20}
          style={{marginRight: 10, color: 'black'}}
        />
        <Text style={{fontWeight: 'bold', padding: 2, color: 'black'}}>
          Ritiro: {NUMERORITIRO}/{FILIALERITIRO}/{ANNORITIRO}
        </Text>
      </View>
      <View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Icon
            name="date-range"
            size={20}
            style={{marginRight: 10, color: 'black'}}
          />
          <Text style={{color: 'black'}}>Data: {DATA_ORA_PREVISTA_INIZIO}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Icon
            name="supervised-user-circle"
            size={20}
            style={{marginRight: 10, color: 'black'}}
          />
          <Text style={{color: 'black'}}>Mittente: {MITTENTE}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Icon
            name="location-on"
            size={20}
            style={{marginRight: 10, color: 'black'}}
          />
          <Text style={{color: 'black'}}>Indirizzo mittente: {M_INDIRIZZO} - {M_LOCALITA} - {M_CAP} - {M_PROVINCIA}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Icon
            name="home-filled"
            size={20}
            style={{marginRight: 10, color: 'black'}}
          />
          <Text style={{color: 'black'}}>Destinatario: {DESTINATARIO}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Icon
            name="location-on"
            size={20}
            style={{marginRight: 10, color: 'black'}}
          />
          <Text style={{color: 'black'}}>Indirizzo destinatario: {D_INDIRIZZO} - {D_LOCALITA} - {D_CAP} - {D_PROVINCIA}</Text>
        </View>

      </View>
    </View>
  );
};

export default ItemRitiri

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    elevation: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }  
})