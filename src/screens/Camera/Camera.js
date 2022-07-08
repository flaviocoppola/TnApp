import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  Button,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';
import {MaterialIndicator} from 'react-native-indicators';

import {UNAME, PWORD, POST_ALLEGATO_BORDERO, ESITO_BORDERO} from '@env';

import styles from './Camera.style';
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
      isLoading: false,
      note: '',
    };
  }

  componentDidMount() {
    this.getData();
    // console.log(POST_ALLEGATO_BORDERO, ESITO_BORDERO)
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

  onSelectedImage = image => {
    let newDataImage = this.state.fileList;
    const source = {uri: image.path};
    const blob = base64.encode(image.path);
    let item = {
      url: source,
      name: `${this.state.SP_NUMERO}-${this.state.SP_ANNO}-${this.state.SP_FILIALE}.png`,
      data: blob,
    };
    newDataImage.push(item);
    this.setState({fileList: newDataImage});
  };

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    }).then(image => {
      this.onSelectedImage(image);
    });
  };

  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      multiple: false,
    }).then(image => {
      this.onSelectedImage(image);
    });
  };

  esitoBordero = async () => {
    const {
      SP_ANNO,
      SP_NUMERO,
      SP_FILIALE,
      vAnno,
      vFiliale,
      vNumero,
      STATO_CONSEGNA,
      STATO_CONTROLLO,
      note
    } = this.state;
    const fileEsito = `${SP_ANNO}-${SP_FILIALE}-${SP_NUMERO}` + Date.now();
    // console.log(fileEsito);
    try {
      const API = `${ESITO_BORDERO}&NOME_FILE_ESITO=${fileEsito}&Note=${note}&SPEDIZIONEANNO=${SP_ANNO}&SPEDIZIONEFILIALE=${SP_FILIALE}&SPEDIZIONENUMERO=${SP_NUMERO}&STATO_CONSEGNA=${STATO_CONSEGNA}&STATO_CONTROLLO=${STATO_CONTROLLO}&VIAGGIOANNO=${vAnno}&VIAGGIOFILIALE=${vFiliale}&VIAGGIONUMERO=${vNumero}&paramEmailError=p.soglia%40tntorello.com%2C+f.coppola%40tntorello.com&showform=submit`;
      const user = UNAME;
      const pass = PWORD;
      const response = await fetch(API, {
        headers: {
          Authorization: 'Basic ' + base64.encode(user + ':' + pass),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  sendData = () => {
    const {
      SP_ANNO,
      SP_NUMERO,
      SP_FILIALE,
      vAnno,
      vFiliale,
      vNumero,
      STATO_CONSEGNA,
      STATO_CONTROLLO,
      note
    } = this.state;
    this.esitoBordero();
    this.state.fileList.map(({name, data}) => {
      const postData = async () => {
        try {
          console.log(name);
          this.setState({isLoading: true});
          const API = `${POST_ALLEGATO_BORDERO}FILE=${data}&NOMEFILE=${name}&NOTE=${note}&STATO_CONSEGNA=${STATO_CONSEGNA}&STATO_CONTROLLO=${STATO_CONTROLLO}&SPEDIZIONEANNO=${SP_ANNO}&SPEDIZIONEFILIALE=${SP_FILIALE}&SPEDIZIONENUMERO=${SP_NUMERO}&VIAGGIOANNO=${vAnno}&VIAGGIOFILIALE=${vFiliale}&VIAGGIONUMERO=${vNumero}&paramEmailError=p.soglia%40tntorello.com%2C+f.coppola%40tntorello.com&showform=submit`;
          const user = UNAME;
          const pass = PWORD;
          const response = await fetch(API, {
            headers: {
              Authorization: 'Basic ' + base64.encode(user + ':' + pass),
            },
          });
          this.props.navigation.navigate('Viaggio');
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({isLoading: false});
        }
      };
      postData();
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
              onPress={() => this.sendData()}>
              <Icon name="send" size={36} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
        {this.state.isLoading ? (
          <MaterialIndicator />
        ) : (
          <>
            <FlatList
              data={this.state.fileList}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.state}
            />
            <TextInput
              placeholder="Note"
              placeholderTextColor="#424242"
              style={styles.inputNote}
              underlineColorAndroid="transparent"
              multiline={true}
              onChangeText={text => this.setState({note: text})}
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
          </>
        )}
      </View>
    );
  }
}

export default Camera;
