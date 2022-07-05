import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 30,
  },
  btnPressStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#424242',
    padding: 10,
    borderRadius: 50,
    marginRight: 10
  },
  itemImage: {
    backgroundColor: '#2f455c',
    height: 150,
    width: width - 60,
    resizeMode: 'contain',
  },
  itemViewImage: {
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
    height: 150,
    width: width - 60,
    marginBottom: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  btnIcon: {
    marginRight: 10
  },
  btnDetail:{
    backgroundColor: '#4682b4',
    padding: 10,
    borderRadius: 50,
  },
  inputNote: {
    borderColor: '#424242',
    borderWidth: 0.8,
    borderRadius: 10,
    padding: 10,
    height: 100,
    marginTop: 20,
    color: '#000',
  }
});

export default styles;
