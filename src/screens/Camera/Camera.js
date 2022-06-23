import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Camera.style'
class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      SP_ANNO: '',
      SP_FILIALE: '',
      SP_NUMERO: '',
      vAnno: '',
      vFiliale: '',
      vNumero: '',
      STATO_CONSEGNA: '',
      STATO_CONTROLLO: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    try {
      AsyncStorage.getItem('filiale').then(value => {
        this.setState({vFiliale: value});
      });
      AsyncStorage.getItem('numero').then(value => {
        this.setState({vNumero: value});
      });
      AsyncStorage.getItem('anno').then(value => {
        this.setState({vAnno: value});
      });

      this.setState({SP_ANNO: this.props.route.params.SP_ANNO});
      this.setState({SP_FILIALE: this.props.route.params.SP_FILIALE});
      this.setState({SP_NUMERO: this.props.route.params.SP_NUMERO});
      this.setState({STATO_CONSEGNA: this.props.route.params.STATO_CONSEGNA});
      this.setState({STATO_CONTROLLO: this.props.route.params.STATO_CONTROLLO});
    } catch (error) {
      console.log(error);
    }
  };

  renderItem = ({item, index}) => {
    return (
      <View style={styles.itemViewImage}>
        <Image source={{uri: item.url.uri}} style={styles.itemImage} />
      </View>
    );
  };

  sendData = async () => {
    try {
      setIsLoading(true);
      // uploadImage();
      const blob = base64.encode(image);
      const API = `${POST_API_BRD}&FILE_BLOB=${blob}&NOME_FILE=${SP_NUMERO}-${SP_ANNO}-${SP_FILIALE}.png&NOME_FILE_ESITO=&SPEDIZIONE_ANNO=${SP_ANNO}&SPEDIZIONE_FILIALE=${SP_FILIALE}&SPEDIZIONE_NUMERO=${SP_NUMERO}&STATO_CONSEGNA=${STATO_CONSEGNA}&STATO_CONTROLLO=${STATO_CONTROLLO}&VIAGGIOANNO=${anno}&VIAGGIOFILIALE=${filiale}&VIAGGIONUMERO=${numero}&paramEmailError=p.soglia%40tntorello.com&showform=submit`;
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

  onSelectedImage = image => {
    let newDataImage = this.state.fileList;
    const source = {uri: image.path};
    let item = {
      url: source,
      name:
        this.state.spNumero - this.state.spAnno - this.state.spFiliale + '.png',
      data: image.data,
    };
    newDataImage.push(item);
    this.setState({fileList: newDataImage});
    console.log(this.state.fileList);
  };

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      includeBase64: true,
    }).then(image => {
      this.onSelectedImage(image);
      // console.log(image);
    });
  };

  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 1600,
      cropping: false,
      multiple: true,
      includeBase64: true,
    }).then(image => {
      this.onSelectedImage(image);
      console.log(image);
    });
  };

  render() {
    return (
      <View style={styles.content}>
        {this.state.fileList.length > 0 ? (
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnDetail}
              onPress={() => this.setState({fileList: []})}>
              <Icon name="delete-forever" size={36} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnDetail}
              onPress={() => console.log('send')}>
              <Icon name="send" size={36} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
        <FlatList
          data={this.state.fileList}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
        />

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnPressStyle}
            onPress={this.choosePhotoFromLibrary}>
            <Icon
              name="photo-library"
              size={30}
              color="#fff"
              style={styles.btnIcon}
            />
            <Text>Scegli foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnPressStyle}
            onPress={this.takePhotoFromCamera}>
            <Icon
              name="add-a-photo"
              size={30}
              color="#fff"
              style={styles.btnIcon}
            />
            <Text>Scatta foto</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Camera;
