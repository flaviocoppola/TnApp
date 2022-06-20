import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.3
  },
  body: {
      flexDirection: 'column',
  },
  touch: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
  },
  text: {
    color: 'black',
  }
});

export default styles;
