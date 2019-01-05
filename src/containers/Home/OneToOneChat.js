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

import MessageContainer from '@components/Chat/MessageContainer'
import MessageForm from '@components/Chat/MessageForm'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/actions';
import { connect } from 'react-redux';
import firebaseService from '@utils/firebase'
import NotifService from '@app/Notifications/NotifService';
import Loader from '@components/Loader'
const ITEM_HEIGHT = 50

class OneToOneChat extends Component{
  constructor(props){
    super(props);
    this.state={
      message:null,
    }
  }

  getChatItems (data){
    return data ? Object.keys(data).map(key => data[key]) : []
  }

  componentDidMount(){
    this.props.oneToOneChatLoading(this.props.receiverId) //Id of the receiver person
  }

  emptyList(){
    return(
      <Text
        style={styles.placeholder}>
        Chat history is empty
      </Text>
    )
  }

  setMessage=(message)=>{
    this.setState({message})
  }

  sendMessage=()=>{
    const {pushToken,receiverId} =this.props;
    this.props.oneToOneChat(this.state.message,receiverId,pushToken) //id of the receiver person
    this.setState({message:null})
  }

  render(){
    const {messages,isLoading}= this.props;
    const {message} = this.state;
    const data = this.getChatItems(messages).reverse();
    const contentContainerStyle = data.length ? null : styles.flatlistContainerStyle

    return(
      <View style={styles.container}>
        <Loader isLoading={isLoading} />
        <FlatList
          ref={(c) => { this.flatList = c }}
          style={styles.container}
          contentContainerStyle={contentContainerStyle}
          data={data}
          keyExtractor={item => item.time}
          renderItem={ ({item}) =><MessageContainer  message={item} />}
          getItemLayout={(data, index) => ({length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index})}
          ListEmptyComponent={this.emptyList}
          inverted />
          <MessageForm  setMessage={this.setMessage} value={message} sendMessage={this.sendMessage}/>
        </View>



      )
    }
  }

  const mapStateToProps = state => ({
    messages: state.chatReducers.messages,
    isLoading: state.chatReducers.isLoading,

  });
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
  }
  export default connect(mapStateToProps,mapDispatchToProps)(OneToOneChat);

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#eeeeee'
    },
    flatlistContainerStyle: {
      flexGrow: 1,
      justifyContent: 'center'
    },
    placeholder: {
      fontSize: 16,
      color: 'grey',
      textAlign: 'center'
    }

  });
