import React, {Component} from 'react';
import {
  Text,
  View,
  LayoutAnimation,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Buffer} from 'buffer';
import {authorize} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './Auth.style';
import {CLIENTID, REDIRECTURL, AUTHORIZATIONENDPOINT, TOKENENDPOINT} from '@env'

type State = {
  hasLoggedInOnce: boolean,
  accessToken: ?string,
  accessTokenExpirationDate: ?string,
  refreshToken: ?string,
  idToken: ?string,
  loading: boolean,
  userData: boolean,
};

const config = {
  clientId: CLIENTID,
  redirectUrl: REDIRECTURL,
  additionalParameters: {prompt: 'select_account'},
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  serviceConfiguration: {
    authorizationEndpoint: AUTHORIZATIONENDPOINT,
    tokenEndpoint: TOKENENDPOINT,
  },
};
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoggedInOnce: false,
      accessToken: null,
      accessTokenExpirationDate: '',
      refreshToken: '',
      idToken: '',
      loading: false,
      userData: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  animateState(nextState: $Shape<State>, delay: number = 0) {
    setTimeout(() => {
      this.setState(() => {
        LayoutAnimation.easeInEaseOut();
        return nextState;
      });
    }, delay);
  }

  authorize = async () => {
    try {
      const authState = await authorize(config);
      this.animateState(
        {
          hasLoggedInOnce: true,
          accessToken: authState.accessToken,
          accessTokenExpirationDate: authState.accessTokenExpirationDate,
          refreshToken: authState.refreshToken,
          idToken: authState.idToken,
        },
        500,
      );
      const jwtBody = authState.idToken.split('.')[1];
      const base64 = jwtBody.replace('-', '+').replace('_', '/');
      const decodedJwt = Buffer.from(base64, 'base64');
      const idTokenJSON = JSON.parse(decodedJwt);
      const dataUtente = {nome: idTokenJSON.name, email: idTokenJSON.email};
      try {
        var user = {
          email: dataUtente.email,
          name: dataUtente.nome,
          token: authState.accessToken,
        };
        await AsyncStorage.setItem('userData', JSON.stringify(user));
        this.props.navigation.dispatch(StackActions.replace('Main'))
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      Alert.alert('Errore Log in', error.message);
    }
  };

  getData = () => {
    try {
      AsyncStorage.getItem('userData').then(value => {
        if (value != null) {
          this.props.navigation.dispatch(StackActions.replace('Main'))
        }
      });
    } catch (error) {
      console.log(error);
    }
  };


  render() {
    const {state} = this;
    if (state.idToken) {
      const jwtBody = state.idToken.split('.')[1];
      const base64 = jwtBody.replace('-', '+').replace('_', '/');
      const decodedJwt = Buffer.from(base64, 'base64');
      state.idTokenJSON = JSON.parse(decodedJwt);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Benvenuto, accedi con il tuo account aziendale
        </Text>
        <Image
          source={require('../../assets/Image/undraw_Login_re_4vu2.png')}
          style={styles.image}
        />
        <TouchableOpacity style={styles.loginBtn} onPress={this.authorize}>
          <Icon name="login" size={25} color="white"/>
          <Text style={styles.btnText}>Accedi</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Auth;
