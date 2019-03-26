import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import styles from '../Containers/Styles/RankingsStyle'

export default class RankingsList extends Component {

  render() {
     return <FlatList
                data={this.props.rankings}
                renderItem={({ item, index }) =>
                <View style={styles.standingContainer} key={index}>
                  <View style={styles.rankContainer}>
                    <Text style={styles.elementText}>{item.rank}</Text>
                  </View>
                  <View style={styles.moveContainer}>
                    <Text style={styles.elementText}>{item.move}</Text>
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.elementText}>{item.name}</Text>
                  </View>

                  <View style={styles.utrContainer}>
                    <Text style={styles.elementText}>{item.utr}</Text>
                  </View>
                </View>

                }
                keyExtractor={item => item.playerID.toString()}
              />
  }

}
