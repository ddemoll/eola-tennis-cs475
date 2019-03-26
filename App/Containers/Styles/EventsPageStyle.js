import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  matchDateContainer: {
    margin: 8,
    justifyContent: 'space-between',
  },
  matchDateText: {
    textAlign: 'center'
  },
  matchMonthText: {
    textAlign: 'center',
    color: 'red'
  },

})
