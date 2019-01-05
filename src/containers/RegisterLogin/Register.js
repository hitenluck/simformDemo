
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
import { FlatRow,InputField,Button} from '@components'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import NotifService from '@app/Notifications/NotifService';
import Loader from '@components/Loader'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      email:'',
      registerToken:null,
    }
    this.createUser=this.createUser.bind(this);
    this.notif = new NotifService();
  }

  onRegister(token) {
    console.warn(token);
    this.setState({ registerToken: token.token});
  }

  componentDidMount(){
    this.notif.configureToGetToken(this.onRegister.bind(this))
  }

  createUser(){
    const {username,password,email,registerToken}= this.state;
    if(username==-'' || password===''){
      alert("Please enter valid email and password")
    }
    else{
      this.props.registerUser(username,password,email,registerToken)
    }
  }


  render() {
    const {isLoading} = this.props
    return (
      <View  style={styles.container}>
        <Loader isLoading={isLoading} />
        <InputField
          onChange={(username)=>{this.setState({username})}}
          placeHolder="Username"
        />
        <InputField
          onChange={(email)=>{this.setState({email})}}
          placeHolder="Email"

        />

        <InputField
          onChange={(password)=>{this.setState({password})}}
          placeHolder="Password"
          secureTextEntry={true}
        />


        <Button  onPress={this.createUser}>
          <Text>REGISTER</Text>
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
export default connect(mapStateToProps,mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  container:{
    flex:1,justifyContent: 'center'
  }

});
