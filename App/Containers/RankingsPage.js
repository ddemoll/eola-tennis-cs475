import React from 'react'
import { View, ActivityIndicator, Linking, FlatList, Alert, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import RankingsActions from '../Redux/RankingsRedux'
import { CommonBasePage } from './CommonContainers'
import { Title, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body, ActionSheet,
List, ListItem } from 'native-base';

// Styles
import styles from './Styles/RankingsStyle'
import Fonts from '../Themes/Fonts'
import RankingsList from '../Components/RankingsList'
import UTRProgress from '../Components/UTRProgress'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { Images } from "../Themes";

class RankingsPage extends React.PureComponent {

  constructor (props) {
     super(props)

     this.state = {
       data: [],
       selectedRankingIndex: 0,
       selectedGenders: [0, 1]

     }
  }


  componentDidMount() {
    //if(this.props.announcements.payload == null)
    this.props.dispatch(RankingsActions.rankingsRequest());

  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.rankings.fetching && (this.props.rankings.payload != nextProps.rankings.payload)) {
      console.log('pay', nextProps.rankings.payload)

      this.setState({data: nextProps.rankings.payload.singles})
    }
  }

  handleGenderIndexSelect = (index) => {

    if(this.state.selectedGenders.length == 1) {
      if(this.state.selectedGenders[0] == index) {
        this.state.selectedGenders = []
      }
    }

      if (this.state.selectedGenders.includes(index)) {
          this.setState({
              ...this.state,
              selectedGenders: this.state.selectedGenders.filter((i) => i !== index),
          });
      }
      else {
          this.setState({
              ...this.state,
              selectedGenders: [
                  ...this.state.selectedGenders,
                  index,
              ],
          });
      }



  }

  handleDelete = (id) => {
    Alert.alert(
      'Delete Player',
      'Are you sure you want to delete this player? This action will recalculate the rankings.',
      [

        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => this.props.dispatch(RankingsActions.rankingsDelete(id))},
      ],
      { cancelable: false }
    )
  }

  render () {


    const {fetching, error, payload} = this.props.rankings;
    const {selectedGenders, selectedRankingIndex} = this.state

    let content = <ActivityIndicator style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large" />

    if (error !== null) {
      content = <Text style={{padding: 10, textAlign: 'center', color: 'red'}}>Error!</Text>
    }
    if(payload !== null) {

      let rankingList = payload.singles
      if(selectedRankingIndex == 1) {
        rankingList = payload.doubles
      }

      if(selectedGenders.length == 1) {
        let genderMap = {'Male': 0, 'Female': 1}
        rankingList = rankingList.filter((item) => genderMap[item.gender] == selectedGenders[0])
      }

      content = <View style={{flex: 1}}>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <SegmentedControlTab
                tabsContainerStyle={{flex:2}}
                borderRadius={5}
                tabStyle={{margin:10, borderRadius: 5, borderColor: 'transparent'}}
                  values={['Singles', 'Doubles']}
                  selectedIndex={this.state.selectedRankingIndex}
                  onTabPress={(index) => {this.setState({selectedRankingIndex: index})}}
                />
                <SegmentedControlTab
                tabsContainerStyle={{flex:2}}
                borderRadius={5}
                tabStyle={{margin:10, borderRadius: 5, borderColor: 'transparent'}}
                  multiple={true}
                  values={['Male', 'Female']}
                  selectedIndices={this.state.selectedGenders}
                  onTabPress={this.handleGenderIndexSelect}
                />
                </View>

                <View style={styles.headerContainer}>
                  <View style={styles.rankContainer}>
                    <Text style={styles.elementText}>RK</Text>
                  </View>
                  <View style={styles.moveHeaderContainer}>
                    <Text style={styles.elementText}>Move</Text>
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.elementText}>Player</Text>
                  </View>

                  <View style={styles.utrHeaderContainer}>
                    <Text style={styles.elementText}>UTR</Text>
                  </View>
                  {this.props.username != null &&
                  <View style={styles.deleteContainer}>
                    <Text style={styles.elementText}>Delete</Text>
                  </View>
                  }
                </View>


      <FlatList
                 data={rankingList}
                 renderItem={({ item, index }) => {

                let moveIcon = null;
                let move = item.move;
                if(move > 0) {
                  moveIcon = <Image source={Images.move_up} style={{width: 20, resizeMode: 'contain', marginRight: 2}} />
                } else if(move < 0) {
                  move *= -1;
                  moveIcon = <Image source={Images.move_down} style={{width: 20, resizeMode: 'contain', marginRight: 2}} />
                }

                let rank = <Text style={styles.elementText}>{item.rank}</Text>
                if(item.rank == 1) {
                  rank = <Image source={Images.first_place} style={{width: 40, resizeMode: 'contain'}} />
                } else if(item.rank == 2) {
                  rank = <Image source={Images.second_place} style={{width: 40, resizeMode: 'contain'}} />
                } else if(item.rank == 3) {
                  rank = <Image source={Images.third_place} style={{width: 40, resizeMode: 'contain'}} />
                }

                 return <View style={styles.standingContainer} key={index}>
                   <View style={styles.rankContainer}>
                     {rank}
                   </View>
                   <View style={styles.moveContainer}>
                      {moveIcon}<Text style={{marginLeft: 2}}>{move == 0 ? '-' : move}</Text>
                   </View>
                   <View style={styles.nameContainer}>
                     <Text style={styles.elementText}>{item.name}</Text>
                   </View>

                   <View style={styles.utrContainer}>

                     <UTRProgress rating={item.utr} ratingStatus={item.ratingStatus} ratingProgress={item.ratingProgress}/>
                   </View>
                   {this.props.username != null &&
                   <View style={styles.deleteContainer}>
                     <Button small style={{backgroundColor: 'red', alignSelf: 'flex-end'}} onPress={() => this.handleDelete(item.playerID)}>
                         <Icon name="ios-close" />
                     </Button>
                   </View>
                  }
                 </View>

                  }
                 }
                 keyExtractor={item => item.playerID.toString()}
               />
               </View>
            }
            return (
			<CommonBasePage
			  pagetitle={"UTR Power Rankings"}
			  navigation={this.props.navigation}
			  rightcontent={this.props.username != null &&
				  <Button transparent onPress={() => this.props.navigation.navigate("AddRankingsPlayer")}>
					  <Icon name='md-add' />
				  </Button>}
				> 
				  {content}				  
			  </CommonBasePage> 
            )

          }
}

const mapStateToProps = (state) => {
  return {
    rankings: state.rankings,
    username: state.login.username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RankingsPage)
