import React, { Component } from 'react'
import { View } from 'react-native'
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop,
    Text
} from 'react-native-svg';

export default class UTRProgress extends Component {

    render() {
      let ratingText = this.props.rating
      let dividend = this.props.rating
      let divisor = 16.5
      if(this.props.ratingStatus == "Projected") {
        dividend = this.props.ratingProgress
        divisor = 100
      } else if(this.props.ratingStatus == "Unrated") {
        ratingText = "UR"
        dividend = 0.5
      }

      let CIRCUMFERENCE = 295.31;
      let progress = (dividend/divisor)*0.75;
      let dashOffset = CIRCUMFERENCE * (1-progress);
        return (

          <Svg
                height="50"
                width="50"
            >

            <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="100">
                    <Stop offset="0%" stopColor="#d2db00"/>
                    <Stop offset="30%" stopColor="#00bab6"/>
                    <Stop offset="80%" stopColor="#e0007f"/>
                </LinearGradient>
            </Defs>

            <G scale="0.5" >

            <Path
                   d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
                   fill="none"
                   stroke="#d6d6d6"
                   strokeWidth="6"
                   strokeLinecap="round"
               />

                <Path
                   d="M 50 50 m 0 -47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
                   fill="none"
                   stroke={this.props.ratingStatus == "Rated" ? "url(#grad)" : "#738b9c"}
                   strokeWidth="6"
                   strokeDasharray="295.31" strokeDashoffset={dashOffset}
                   transform="rotate(180, 50, 50)"
                   strokeLinecap="round"

               />
               <Path
                      d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
                      fill="none"
                      stroke="white"
                      strokeWidth="6"
                      strokeDasharray="295.31" strokeDashoffset={221.4825}
                      transform="rotate(90, 50, 50)"

                  />
                  <Text
                      fill="black"
                      fontSize="28"
                      fontWeight="bold"
                      x="50"
                      y="60"
                      textAnchor="middle">{ratingText}</Text>
               </G>


            </Svg>

          )
    }
}
