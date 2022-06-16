import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    container: {
        position: 'relative'
      },
    
      captueContainer: {
        position: 'absolute',
        bottom: 0,
      },
      
      captureBtn: {
        backgroundColor: 'red'
      },
    preview: {
        flex: 1,
        alignItems: 'center',
      },
      searchBtn: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30,
        backgroundColor: '#424242',
        padding: 7,
        borderRadius: 50,
        marginRight: 20
      },
      searchSection: {
        flexDirection: 'row',
      },
})

export default styles