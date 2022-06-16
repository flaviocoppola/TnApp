import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 5,
    width: '80%',
    borderRadius: 50,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  title: {
    fontSize: 20,
    marginBottom: 50,
  },
  searchBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#424242',
    padding: 7,
    borderRadius: 50,
  },
  actionBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#424242',
    padding: 7,
    borderRadius: 50,
    margin: 10
  },
  alert: {
    fontSize: 25,
    marginBottom: 50,
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: 10,
    padding: 10,
  }, 
  btnContainer: {
    flexDirection: 'row',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  btnDetail:{
    backgroundColor: '#4682b4',
    padding: 10,
    borderRadius: 50,
  },
  listHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default styles;
