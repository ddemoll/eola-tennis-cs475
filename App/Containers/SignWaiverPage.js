import React from 'react'
import { Dimensions, Button, TextInput, View, Switch, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import SignWaiverActions from '../Redux/SignWaiverRedux'
import { CommonBasePage } from './CommonContainers'
import { Text } from 'native-base';
import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';

// Styles
import styles from './Styles/StorePageStyle'
import Fonts from '../Themes/Fonts'
import getTheme from '../../native-base-theme/components';
import { Images } from "../Themes";

// TODO: make this something with SES in AWS? 
//import { PushNotification } from 'aws-amplify-react-native';


class SignWaiverPage extends React.PureComponent {

  constructor (props) {
     super(props)
     this.width = Dimensions.get('window').width; 
     // signnanme is the state of the text box. signNameRequest is what was actually sent out/requested 
   this.state = { signname : "", signnameRepeat : "", signEmail : "", signCellPhone : "", signNameRequest : "", selectedForm : "", validationMsg : "", 
    agree1 : false, agree2 : false, agree3 : false, agree4 : false, agree5 : false, agree6 : false}
  }

  submitSignRequest = () => {
    if (this.state.agree1 && this.state.agree2 && this.state.agree3 && this.state.agree4 && this.state.agree5 && this.state.agree6) {
      if (this.state.selectedForm == "parent" || (this.state.selectedForm == "adult" && this.state.signname == this.state.signnameRepeat)) {
        if (this.state.signname != '' && this.state.signEmail != '' && this.state.signCellPhone != '') {
          this.props.requestSign(this.state.signname, this.state.signEmail, this.state.signCellPhone, this.state.selectedForm);
        } else {
          this.setState({validationMsg : "Must provide name, email, and cell phone number"}); 
        }
      } else {
        this.setState({validationMsg : "The two player names must match"}); 
      }
    } else {
      this.setState({validationMsg : "Must agree to all statements"}); 
    }
  }
  
  render () {
/*
    let content = <ActivityIndicator style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large" />


	if (error !== null) {
      content = <Text style={{padding: 10, textAlign: 'center', color: 'red'}}>Error!</Text>
    }
  */
    let { fetching, sendStatus, error } = this.props.signwaiver;

    var waiverTextStyle = { fontSize: 9, padding: 5 };
    var waiverHeaderStyle = {fontSize: 20, textAlign: 'center'};
    var innerContent = <Text>Error</Text>
    var formElements = <View />
    var playerNameInput = <View key="playNameInput"> 
          <Text key="txtName">
            Player Name
          </Text>
          <TextInput key="txtinput"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(signname) => this.setState({signname})}
          value={this.state.signname}
          />
      </View>
    if (this.state.selectedForm == "") {
      innerContent = <View>
        <Text>
          Please select a type of form
        </Text>
      </View> 
    } else if (this.state.selectedForm == "parent") {
      innerContent = <View style={waiverTextStyle}>
        <Text style={waiverHeaderStyle}>Parent Waiver</Text>
        {playerNameInput}
        <Text>I Agree</Text>
        <Switch key="agree1" style={{alignSelf : 'flex-start', color: 'red'}} label='I Agree' title='I Agree' value={this.state.agree1} onValueChange={(val) => this.setState({agree1 : val})} />
        <Text> 
          Cancellation Policy Unless otherwise noted, Eola Tennis Academy’s (ETA) cancellation policy is in effect for all fee-based programs. To qualify for a refund, participants are required to give at least 72-hour written notice prior to the start of a program/session. Students are responsible for attending the class in which they have registered. No refunds or credits will be given for classes missed. Refunds are given due to long term illnesses or injury that would prevent a participant from completing the remainder of the session and the provision of a Doctor’s note. The refund is for the remainder of the current class session and will be calculated from the date the physician’s note is submitted. If for any reason the student cannot attend a class, they can make that class up in a class that is equal to or one level below the registered class, with prior approval from the instructor. Class must be made up during the current session. Maximum of 2 make ups per session. Make up classes are NOT guaranteed. Approval by the instructor is given only if there is room in the class. 
        </Text>
        <Text>I Agree</Text>
        <Switch key="agree2" style={{alignSelf : 'flex-start', color: 'red'}} label='I Agree' title='I Agree' value={this.state.agree2} onValueChange={(val) => this.setState({agree2 : val})} />
        <Text>
          ASSUMPTION OF RISK. The undersigned (or his/her parent of guardian) hereby assumes full responsibility for any and all risk of bodily injury, death or property damage due to the negligence of the event organizers or otherwise participating in or observing in any and all Eola Tennis Academy Inc and Eola Tennis Building LLC activities. I declare that I (and all parties listed on the membership or registration) am physically able to participate in physical activity. Furthermore, the undersigned assumes all responsibility and risk derived from use of the premises and all facilities pursuant to this license, including but not limited to, the use of the members of the undersigned’s immediate family and guests of the undersigned, and further agrees to hold Eola Tennis Academy, Eola Tennis Building LLC , its agents, independent contractors, guarantors, and employees free and harmless for any injury to person or property arising as a result of the use of the premises and facilities as aforesaid. The Club is not and shall not be responsible for any injury, damage, or loss by a member, or his/her family, or guest on or off the Club premises while participating in any Club activity, even if such loss is caused by the acts of omissions of other members, staff, or any other person whatsoever. 
        </Text>
        <Text>I Agree</Text>
        <Switch key="agree3" style={{alignSelf : 'flex-start', color: 'red'}} label='I Agree' title='I Agree' value={this.state.agree3} onValueChange={(val) => this.setState({agree3 : val})} />
        <Text>
        Waiver I, for myself, my heirs, next of kin, my executors and my administrators, hereby waive, release and discharge to the fullest extent permitted by law, any and all rights, claims and/or causes of action I may have or hereafter acquire against Eola Tennis Academy Inc, Eola Tennis Building LLC and/or its representatives, guarantors, successors, and assigns, and/or its event sponsors, owners of event premises, licensees and/or licensors for any and all losses, damages and/or injuries (actual and/or consequential) which may be suffered by me, my family, and/or my guests arising out of or in any way related to the use of any equipment, activity, lessons, programs, leagues, tournaments, and/or special events, including but not limited to any claims of personal injury or death from participating in or attending any such activity, and/or loss of personal property by theft or otherwise during said activity, any publicity related to any event, any prizes awarded, and/or loss of collegiate or high school eligibility as a result of participation in any event, whether caused by negligence of the event organizers or otherwise. I am aware of the possible risks inherent in the nature of the activities provided by Eola Tennis Academy Inc, Eola Tennis Building LLC and that Eola Tennis Academy Inc, Eola Tennis Building LLC does not provide medical insurance covering injuries of any nature incurred in any activity and/or event. 
        </Text>
        <Text>I Agree</Text>
        <Switch key="agree4" style={{alignSelf : 'flex-start', color: 'red'}} label='I Agree' title='I Agree' value={this.state.agree4} onValueChange={(val) => this.setState({agree4 : val})} />
        <Text>
        PUBLICITY. The undersigned (or his/her parent or guardian) hereby consents to the use without compensation, of his/her name and/or likeness, biographical material and/or voice in publicity and advertising concerning any and all Eola Tennis Academy Inc activities and by sponsors of any event and/or their promotion by way of any medial throughout the world. 
        </Text>
        <Text>I Agree</Text>
        <Switch key="agree5" style={{alignSelf : 'flex-start', color: 'red'}} label='I Agree' title='I Agree' value={this.state.agree5} onValueChange={(val) => this.setState({agree5 : val})}/>
        <Text>FOR USE WHEN MINORS ARE INVOLVED. I understand that every precaution will be taken to protect the safety of each participant in this program. However, I also understand that I am responsible for all personal medical insurance on the above-named child (hereinafter “the child”) and that I will be responsible for any medical costs incurred as a result of the child’s participation in this program. I agree to assume full risk for any and all activities in which the child may participate and I hereby waive, relinquish and release any and all claims which I and/or the child may have or obtain against Eola Tennis Academy Inc., Eola Tennis Building LLC or any of its owners, officers, agents, servants, guarantors, employees, associates, affiliates as a result of injury which I and/or the child may sustain in any activity associated with the Eola Tennis Academy Inc and Eola Tennis Building LLC. I voluntarily accept this risk and agree that the Eola Tennis Academy Inc and Eola Tennis Building LLC will not be liable for any injury, including and without limitation, personal, bodily or mental injury, economic loss or any other damages. If there is any claim by anyone based on injury, loss or damage described herein, which involves me or the child, I agree to defend and indemnify the Eola Tennis Academy Inc and Eola Tennis Building LLC against such claims and reimburse the Eola Tennis Academy Inc and Eola Tennis Building LLC for any and all expenses relating to said claim. In case of medical emergency, I authorize the Eola Tennis Academy Inc to arrange for emergency medical treatment of the child.         </Text>
        <Text>I Agree</Text>
        <Switch key="agree6" style={{alignSelf : 'flex-start', color: 'red'}} label='I Agree' title='I Agree' value={this.state.agree6} onValueChange={(val) => this.setState({agree6 : val})}/>
        <Text>
        I, the PARENT, AGREES to all the above Waiver and Cancellation Policy by submitting this online form to Eola Tennis Academy. I acknowledge that I have read and understand this agreement and will not be allowed to submit this form without all boxes on this waiver form being clicked to indicate my agreement. I am fully accepting responsibility for my or above said minor's action as it pertains to this agreement.
        </Text>

        <Text key="txt1">
            Parent Name
          </Text>
          <TextInput key="txtinput1"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(signnameRepeat) => this.setState({signnameRepeat})}
          value={this.state.signnameRepeat}
          /> 
        <Text key="txt2">
            Parent Email address
          </Text>
          <TextInput key="txtinput2"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(signEmail) => this.setState({signEmail})}
          value={this.state.signEmail}
          /> 
        <Text key="txt3">
            Parent Cell Phone
          </Text>
          <TextInput key="txtinput3"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(signCellPhone) => this.setState({signCellPhone})}
          value={this.state.signCellPhone}
          />
      </View>
      formElements = <View>
          <Button key="btn" onPress={this.submitSignRequest} title="Submit" />
        </View>

    } else if (this.state.selectedForm == "adult") {
      innerContent = <View style={waiverTextStyle}> 
        <Text style={waiverHeaderStyle}>Adult Waiver</Text>
        {playerNameInput}
        <Text>I Agree</Text>
        <Switch key="agree1" style={{alignSelf : 'flex-start', color: 'red'}} label='I Agree' title='I Agree' value={this.state.agree1} onValueChange={(val) => this.setState({agree1 : val})}/>
        <Text>
        Cancellation Policy Unless otherwise noted, Eola Tennis Academy’s (ETA) cancellation policy is in effect for all fee-based programs. To qualify for a refund, participants are required to give at least 72-hour written notice prior to the start of a program/session. Students are responsible for attending the class in which they have registered. No refunds or credits will be given for classes missed. Refunds are given due to long term illnesses or injury that would prevent a participant from completing the remainder of the session and the provision of a Doctor’s note. The refund is for the remainder of the current class session and will be calculated from the date the physician’s note is submitted. If for any reason the student cannot attend a class, they can make that class up in a class that is equal to or one level below the registered class, with prior approval from the instructor. Class must be made up during the current session. Maximum of 2 make ups per session. Make up classes are NOT guaranteed. Approval by the instructor is given only if there is room in the class. 
        </Text>
        <Text>I Agree</Text>
        <Switch key="agree2" style={{alignSelf : 'flex-start', color: 'red'}} label='I Agree' title='I Agree' value={this.state.agree2} onValueChange={(val) => this.setState({agree2 : val})} />
        <Text>
        <Text>I Agree</Text>
        ASSUMPTION OF RISK. The undersigned (or his/her parent of guardian) hereby assumes full responsibility for any and all risk of bodily injury, death or property damage due to the negligence of the event organizers or otherwise participating in or observing in any and all Eola Tennis Academy Inc and Eola Tennis Building LLC activities. I declare that I (and all parties listed on the membership or registration) am physically able to participate in physical activity. Furthermore, the undersigned assumes all responsibility and risk derived from use of the premises and all facilities pursuant to this license, including but not limited to, the use of the members of the undersigned’s immediate family and guests of the undersigned, and further agrees to hold Eola Tennis Academy, Eola Tennis Building LLC , its agents, independent contractors, guarantors, and employees free and harmless for any injury to person or property arising as a result of the use of the premises and facilities as aforesaid. The Club is not and shall not be responsible for any injury, damage, or loss by a member, or his/her family, or guest on or off the Club premises while participating in any Club activity, even if such loss is caused by the acts of omissions of other members, staff, or any other person whatsoever. 
        </Text>
        <Text>I Agree</Text>
        <Switch key="agree3" style={{alignSelf : 'flex-start', color: 'red'}} label='I Agree' title='I Agree' value={this.state.agree3} onValueChange={(val) => this.setState({agree3 : val})} />
        <Text>
        Waiver I, for myself, my heirs, next of kin, my executors and my administrators, hereby waive, release and discharge to the fullest extent permitted by law, any and all rights, claims and/or causes of action I may have or hereafter acquire against Eola Tennis Academy Inc, Eola Tennis Building LLC and/or its representatives, guarantors, successors, and assigns, and/or its event sponsors, owners of event premises, licensees and/or licensors for any and all losses, damages and/or injuries (actual and/or consequential) which may be suffered by me, my family, and/or my guests arising out of or in any way related to the use of any equipment, activity, lessons, programs, leagues, tournaments, and/or special events, including but not limited to any claims of personal injury or death from participating in or attending any such activity, and/or loss of personal property by theft or otherwise during said activity, any publicity related to any event, any prizes awarded, and/or loss of collegiate or high school eligibility as a result of participation in any event, whether caused by negligence of the event organizers or otherwise. I am aware of the possible risks inherent in the nature of the activities provided by Eola Tennis Academy Inc, Eola Tennis Building LLC and that Eola Tennis Academy Inc, Eola Tennis Building LLC does not provide medical insurance covering injuries of any nature incurred in any activity and/or event. 
        </Text>
        <Text>I Agree</Text>
        <Switch key="agree4" style={{alignSelf : 'flex-start', color: 'red'}} label='I Agree' title='I Agree' value={this.state.agree4} onValueChange={(val) => this.setState({agree4 : val})} />
        <Text>
        PUBLICITY. The undersigned (or his/her parent or guardian) hereby consents to the use without compensation, of his/her name and/or likeness, biographical material and/or voice in publicity and advertising concerning any and all Eola Tennis Academy Inc activities and by sponsors of any event and/or their promotion by way of any medial throughout the world. 
        </Text>
        <Text>I Agree</Text>
        <Switch key="agree5" style={{alignSelf : 'flex-start', color: 'red'}} label='I Agree' title='I Agree' value={this.state.agree5} onValueChange={(val) => this.setState({agree5 : val})} />
        <Text>
        FOR USE WHEN MINORS ARE INVOLVED. I understand that every precaution will be taken to protect the safety of each participant in this program. However, I also understand that I am responsible for all personal medical insurance on the above-named child (hereinafter “the child”) and that I will be responsible for any medical costs incurred as a result of the child’s participation in this program. I agree to assume full risk for any and all activities in which the child may participate and I hereby waive, relinquish and release any and all claims which I and/or the child may have or obtain against Eola Tennis Academy Inc., Eola Tennis Building LLC or any of its owners, officers, agents, servants, guarantors, employees, associates, affiliates as a result of injury which I and/or the child may sustain in any activity associated with the Eola Tennis Academy Inc and Eola Tennis Building LLC. I voluntarily accept this risk and agree that the Eola Tennis Academy Inc and Eola Tennis Building LLC will not be liable for any injury, including and without limitation, personal, bodily or mental injury, economic loss or any other damages. If there is any claim by anyone based on injury, loss or damage described herein, which involves me or the child, I agree to defend and indemnify the Eola Tennis Academy Inc and Eola Tennis Building LLC against such claims and reimburse the Eola Tennis Academy Inc and Eola Tennis Building LLC for any and all expenses relating to said claim. In case of medical emergency, I authorize the Eola Tennis Academy Inc to arrange for emergency medical treatment of the child. 
        </Text>
        <Text>I Agree</Text>
        <Switch key="agree6" style={{alignSelf : 'flex-start', color: 'red'}} label='I Agree' title='I Agree' value={this.state.agree6} onValueChange={(val) => this.setState({agree6 : val})} />
        <Text>
        I agree to all the above Waiver and Cancellation Policy by submitting this online form to Eola Tennis Academy. I acknowledge that I will not be allowed to submit this form without all boxes on this waiver form being checked to indicate my agreement. I acknowledge that I have read and understand this agreement and will not be allowed to submit this form without all boxes on this waiver form being clicked to indicate my agreement. I am fully accepting responsibility for my or above said minor's action as it pertains to this agreement. 
        </Text>
        
        <Text key="txt1">
            Player Name
          </Text>
          <TextInput key="txtinput1"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(signnameRepeat) => this.setState({signnameRepeat})}
          value={this.state.signnameRepeat}
          /> 
      <Text key="txt2">
          Email address
        </Text>
        <TextInput key="txtinput2"
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(signEmail) => this.setState({signEmail})}
        value={this.state.signEmail}
        /> 
      <Text key="txt3">
          Cell Phone
        </Text>
        <TextInput key="txtinput3"
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(signCellPhone) => this.setState({signCellPhone})}
        value={this.state.signCellPhone}
        />
      </View>
      formElements = <View>
        <Button key="btn" onPress={this.submitSignRequest} title="Submit Waiver" />
      </View>
    }

    let buttonStyleSideBySide = { 
      textAlign : 'center',
      color: 'white',
      backgroundColor: 'blue'
    };
    let buttonStyleSideBySideHighlight = {
      textAlign : 'center',
      color: 'blue',
      backgroundColor: 'white'
    };
    
    return (
      <CommonBasePage
	  pagetitle={"Sign Waiver"}
	  navigation={this.props.navigation} >
        <ScrollView>
          <Button key="btn1" type="outline" style={this.state.selectedForm == "adult" ? buttonStyleSideBySideHighlight : buttonStyleSideBySide} 
            onPress={(e) => this.setState({selectedForm : "adult"})} title="Adult (18 or older)" />
          <Button key="btn2" type="outline" style={this.state.selectedForm == "parent" ? buttonStyleSideBySideHighlight : buttonStyleSideBySide}  
            onPress={(e) => this.setState({selectedForm : "parent"})} title="Parent (under 18)" />

            {innerContent}
            <Text>{this.state.validationMsg}</Text>
            <Text>{fetching ? "Waiver sent. Waiting for response." : 
                      (sendStatus == true ? "Waiver submission successful!" : 
                        (error != null ? "Waiver submission  failed! If this problem persists, please contact an administrator" : "" ))}</Text>
            {formElements} 
        </ScrollView>
      
	</CommonBasePage>

    ); 
  }
}


const mapStateToProps = (state) => {
  return {
  signwaiver : state.signwaiver, 
  signName : state.signNameRequest
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    requestSign: (name, email, cellphone, selectedForm) => dispatch(SignWaiverActions.signWaiverRequest(name, email, cellphone, selectedForm)),
  };
}


//export default SignWaiverPage
export default connect(mapStateToProps, mapDispatchToProps)(SignWaiverPage)
