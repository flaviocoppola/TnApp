import React from 'react';
import {
  View,
  Text,
  Linking,
  Platform,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Item = ({
    ANNO,
    FILIALE,
    NUMERO,
    RAGIONE_SOCIALE,
    INDIRIZZO,
    PESO_LORDO,
    DDT_NUMERO,
    LOCALITA,
    CAP,
    TIPO_INCASSO,
    IMPORTO, 
    STATO_CONTROLLO,
    CONSEGNATA,
    DDT_DATA,
    navigation 
  }) => {
    const openMap = async (address, city, zipCode) => {
      const destination = encodeURIComponent(`${address} ${zipCode}, ${city}`);
      const provider = Platform.OS === 'ios' ? 'apple' : 'google';
      const link = `http://maps.${provider}.com/?daddr=${destination}`;

  
      try {
        const supported = await Linking.canOpenURL(link);
        if (supported) Linking.openURL(link);
      } catch (error) {
        console.error(error);
      }
    };
  
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
      <View
        style={{
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
        }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Errore!','Operazione annullata');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Esita la spedizione, allega poi un documento</Text>
              <TouchableOpacity
                onPress={() =>
                  // Alert.alert('Coming soon!', 'Gestirò lo stato della spedizione')
                  {setModalVisible(false), navigation.navigate('Camera',{
                    STATO_CONSEGNA: 'S',
                    STATO_CONTROLLO: 'CON',
                    SP_ANNO: ANNO,
                    SP_FILIALE: FILIALE,
                    SP_NUMERO: NUMERO,
                  })}
                }
                style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  padding: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#4682b4',
                  borderRadius: 10,
                  marginTop: 10,
                }}>
                <Icon
                  name="check-circle"
                  size={25}
                  color="#fff"
                  style={{marginRight: 10}}
                />
                <Text style={{color: '#fff', fontSize: 10}}>
                  Consegna Regolare
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  // Alert.alert('Coming soon!', 'Gestirò lo stato della spedizione')
                  {setModalVisible(false), navigation.navigate('Camera', {
                    STATO_CONSEGNA: 'N',
                    STATO_CONTROLLO: 'CPA',

                  })}
                }
                style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  padding: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#4682b4',
                  borderRadius: 10,
                  marginTop: 10,
                }}>
                <Icon
                  name="warning"
                  size={25}
                  color="#fff"
                  style={{marginRight: 10}}
                />
                <Text style={{color: '#fff', fontSize: 10}}>
                  Consegna Parziale
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setModalVisible(false)
                }
                style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  padding: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#4682b4',
                  borderRadius: 10,
                  marginTop: 10,
                }}>
                <Icon
                  name="cancel"
                  size={25}
                  color="#fff"
                  style={{marginRight: 10}}
                />
                <Text style={{color: '#fff', fontSize: 10}}>
                  Annulla esito
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={{flexDirection: 'row', borderBottomWidth: 0.3}}>
          <Icon
            name="local-shipping"
            size={20}
            style={{marginRight: 10, color: 'black'}}
          />
          <Text style={{fontWeight: 'bold', padding: 2}}>
            Spedizione: {NUMERO}/{FILIALE}/{ANNO}
          </Text>
        </View>
        <View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Icon
              name="account-circle"
              size={20}
              style={{marginRight: 10, color: 'black'}}
            />
            <Text style={{color: 'black'}}>
              Destinatario: {RAGIONE_SOCIALE}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Icon
              name="location-on"
              size={20}
              style={{marginRight: 10, color: 'black'}}
            />
            <Text style={{color: 'black'}}>
              Indirizzo Scarico: {INDIRIZZO} - {LOCALITA}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Icon
              name="date-range"
              size={20}
              style={{marginRight: 10, color: 'black'}}
            />
            <Text style={{color: 'black'}}>Data DDT: {DDT_DATA}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Icon
              name="info"
              size={20}
              style={{marginRight: 10, color: 'black'}}
            />
            <Text style={{color: 'black'}}>Peso lordo: {PESO_LORDO} Kg</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Icon
              name="description"
              size={20}
              style={{marginRight: 10, color: 'black'}}
            />
            <Text style={{color: 'black'}}>DDT: {DDT_NUMERO}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Icon
              name="euro"
              size={20}
              style={{marginRight: 10, color: 'black'}}
            />
            <Text style={{color: 'black'}}>
              Incasso: {TIPO_INCASSO}, {IMPORTO} €
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Icon
              name="traffic"
              size={20}
              style={{marginRight: 10, color: 'black'}}
            />
            <Text style={{color: 'black'}}>Stato: {STATO_CONTROLLO}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => openMap(INDIRIZZO, LOCALITA, CAP)}
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              padding: 7,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#4682b4',
              borderRadius: 10,
            }}>
            <Icon
              name="navigation"
              size={25}
              color="#fff"
              style={{marginRight: 10}}
            />
            <Text style={{color: '#fff', fontSize: 10}}>Naviga</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              // Alert.alert('Coming soon!', 'Gestirò lo stato della spedizione')
              setModalVisible(true)
            }
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              padding: 7,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#4682b4',
              borderRadius: 10,
            }}>
            <Icon
              name="check"
              size={25}
              color="#fff"
              style={{marginRight: 10}}
            />
            <Text style={{color: '#fff', fontSize: 10}}>Esita</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Camera')}
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              padding: 7,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#4682b4',
              borderRadius: 10,
            }}>
            <Icon
              name="photo-camera"
              size={25}
              color="#fff"
              style={{marginRight: 10}}
            />
            <Text style={{color: '#fff', fontSize: 10}}>Foto</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  export default Item

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      blurRadius: 1,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginTop: 10
    },
    buttonClose: {
      backgroundColor: "#4682b4",
    },
  })
