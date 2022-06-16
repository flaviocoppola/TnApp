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
// import DocumentPicker from 'react-native-document-picker';

import styles from './Camera.style';

export default function Camera({route, navigation}) {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [image, setImage] = React.useState();

  const [filiale, setFiliale] = React.useState('');
  const [anno, setAnno] = React.useState('');
  const [numero, setNumero] = React.useState('');
  const [singleFile, setSingleFile] = React.useState(null);

  const {STATO_CONSEGNA, STATO_CONTROLLO, SP_ANNO, SP_FILIALE, SP_NUMERO} = route.params;

  React.useEffect(() => {
    getViaggi()
    console.log(STATO_CONSEGNA, STATO_CONTROLLO, SP_ANNO, SP_FILIALE, SP_NUMERO);
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

  const sendImage = () => {
    console.log(image);
    Alert.alert('Complimenti', 'Hai correttamente inviato la foto');
    uploadImage()

  }

  const uploadImage = async () => {
    // Check if any file is selected or not
    if (image != null) {
      // If file selected then create FormData
      const fileToUpload = image;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);

      // Please change file upload URL
      let res = await fetch('http://pippo/upload.php', {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      });
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        Alert.alert('Upload Successful');
      }
    } else {
      // If no file selected the show alert
      Alert.alert('Please Select File first');
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
              onPress={() => sendImage()}>
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

