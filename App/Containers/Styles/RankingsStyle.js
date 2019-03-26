import { StyleSheet } from 'react-native'
export default StyleSheet.create({

  //...detailScrollContainerStyle,
  headerContainer: {

    paddingVertical: 8,

    backgroundColor: 'white',
    borderBottomColor: '#707070',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  standingContainer: {

    paddingVertical: 8,
    backgroundColor: 'white',
    borderBottomColor: '#cecece',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',

  },
  rankContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8
  },
  moveHeaderContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  moveContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameContainer: {
    flex: 4,
    justifyContent: 'center'
  },
  utrHeaderContainer: {
    flex: 2,
    justifyContent: 'center',

  },
  utrContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 8
  },
  deleteContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 8
  },
  elementText: {
    textAlign: 'center',
    color: 'black'
  }
});
