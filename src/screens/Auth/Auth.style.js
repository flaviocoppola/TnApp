import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 30,
    marginTop: 40,
    marginBottom: 70,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  loginBtn: {
    alignItems: 'center',
    padding: 10,
    width: 200,
    backgroundColor: '#e20613',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginLeft: 10
  },
});

export default styles;
