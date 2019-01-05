import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  Share,
  StyleSheet,
  TextInput,
  TouchableOpacity

} from 'react-native';
import {images, colors } from '@themes'
import {InputField,Button} from '@components'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/actions';
import { connect } from 'react-redux';
import firebaseService from '@utils/firebase'
import { Actions } from 'react-native-router-flux';
import Loader from '@components/Loader'
import NotifService from '@app/Notifications/NotifService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      pushToken:null,
    }
    this.validateUser = this.validateUser.bind(this);
    this.notif = new NotifService();

  }

  componentDidMount(){
    this.notif.configureToGetToken(this.onRegister.bind(this))
  }

  onRegister(token) {
    this.setState({ pushToken: token.token});
  }

  validateUser(){
    const {username,password,pushToken}= this.state;
    if(username==-'' || password===''){
      alert("Please enter valid email and password")
    }
    else{
      this.props.loginUser(username,password,pushToken)
    }

  }

  render() {
    const {isLoading} = this.props
    return (
      <View  style={{flex:1,justifyContent: 'center',}}>
        <Loader isLoading={isLoading} />
        <InputField
          onChange={(username)=>{this.setState({username})}}
          placeHolder="Your email address?"
          
        />
        <InputField
          onChange={(password)=>{this.setState({password})}}
          placeHolder="Your password?"
          secureTextEntry={true}
        />
        <Button  onPress={this.validateUser}>
          <Text>Login</Text>
        </Button>

        <Button buttonStyle={styles.link}  onPress={()=>{Actions.Register()}}>
          <Text style={styles.linkText}>Dont't have an account? click here</Text>
        </Button>


      </View>

    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.appReducer.isLoading,
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  link:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  linkText:{
    fontSize: 14,
    fontWeight: '600',
    color: 'blue'
  }

});
