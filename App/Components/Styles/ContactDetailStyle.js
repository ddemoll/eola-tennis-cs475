import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  //...ApplicationStyles.screen,


  matchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      borderBottomColor: '#cecece',
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingVertical: 8
  },
  matchDateContainer: {
      margin: 8,
      justifyContent: 'space-between',
  },

  scoreContainer: {
      flex: 1,
      paddingBottom: 8,
      paddingTop: 8
  },
  detailContainer: {

    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'white',
    borderBottomColor: '#cecece',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

})
