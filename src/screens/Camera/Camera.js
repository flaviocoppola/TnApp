import {
  View,
  TouchableOpacity,
  Button,
  Image,
  Text,
  Alert
} from 'react-native';
import React from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import base64 from 'base-64';

// import base64 from 'react-native-base64'

// import DocumentPicker from 'react-native-document-picker';
import {UNAME, PWORD, POST_API_BRD } from '@env'


import styles from './Camera.style';
import base64 from 'react-native-base64';

export default function Camera({route, navigation}) {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [image, setImage] = React.useState();

  const [filiale, setFiliale] = React.useState('');
  const [anno, setAnno] = React.useState('');
  const [numero, setNumero] = React.useState('');
  const [singleFile, setSingleFile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const {STATO_CONSEGNA, STATO_CONTROLLO, SP_ANNO, SP_FILIALE, SP_NUMERO} = route.params;

  React.useEffect(() => {
    getViaggi()
  });


  const getViaggi = async () => {
    await AsyncStorage.getItem('filiale').then(value => {
      if (value != null) {
        setFiliale(value);
      }
    });
    await AsyncStorage.getItem('anno').then(value => {
      if (value != null) {
        setAnno(value);
      }
    });
    await AsyncStorage.getItem('numero').then(value => {
      if (value != null) {
        setNumero(value);
      }
    });
  };

  const captureHandler = async () => {
    try {
      const data = await takePicture();
      setImage(data.uri);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // const uploadImage = async () => {
  //   console.log(image);
  //   //convert image to base64
  //   const blob = base64.encode(image);
  //   console.log(blob);
  // };


  const sendData = async () => {
    try {
      setIsLoading(true);
      // uploadImage();
      const blob = base64.encode(image);
      const API = `${POST_API_BRD}&FILE_BLOB=${blob}&NOME_FILE=test.png&NOME_FILE_ESITO=&SPEDIZIONE_ANNO=${SP_ANNO}&SPEDIZIONE_FILIALE=${SP_FILIALE}&SPEDIZIONE_NUMERO=${SP_NUMERO}&STATO_CONSEGNA=${STATO_CONSEGNA}&STATO_CONTROLLO=${STATO_CONTROLLO}&VIAGGIOANNO=${anno}&VIAGGIOFILIALE=${filiale}&VIAGGIONUMERO=${numero}&paramEmailError=p.soglia%40tntorello.com&showform=submit`;
      const user = UNAME;
      const pass = PWORD;
      const response = await fetch(API, {
        headers: {
          Authorization: 'Basic ' + base64.encode(user + ':' + pass),
        },
      });
      const json = await response.json();
      console.log(json);
      navigation.navigate('Viaggio');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setImage();
    }
  };


  return (
    <>
      {image ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Image source={{uri: image}} style={{width: 300, height: 500}} />
          
          <View style={styles.searchSection}>
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={() => setImage()}>
              <Icon name="cancel" size={27} color="white" />
              <Text style={{color: 'white'}}>Cancella</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.searchBtn}
              onPress={() => sendData()}>
              <Icon name="ios-share" size={27} color="white" />
              <Text style={{color: 'white'}}>Invia</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: '#000'}}>
          <RNCamera
            ref={cameraRef}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.auto}
            style={styles.preview}
            captureAudio={false}
            autoFocus={RNCamera.Constants.AutoFocus.on}
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            }}>
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                backgroundColor: '#fff',
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => captureHandler()}>
              <View
                style={{
                  backgroundColor: '#000',
                  width: 70,
                  height: 70,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                  }}></View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

