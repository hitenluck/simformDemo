import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import relativeDate from 'relative-date'
import firebaseService from '@utils/firebase'
const MESSAGE_TEXT_MARGIN = 50
class MessageRowContainer extends Component {

  render() {
    const {isCurrentUser,message}=this.props;
    const alignItems = isCurrentUser ? 'flex-end' : 'flex-start'
    const margin = isCurrentUser ? {marginLeft: MESSAGE_TEXT_MARGIN} : {marginRight: MESSAGE_TEXT_MARGIN}
    const username = isCurrentUser ? "You" :message.user.username
    const date = relativeDate(new Date(message.createdAt))  //coversion and showing  time on chat screen
    return (
      <View style={styles.containers}>
        <View
          style={ [styles.bubbleView, {alignItems: alignItems}, margin] }>
          <Text
            style={styles.userText} >
            {date + ' - ' + username}
          </Text>
          <Text
            style={styles.messageText}>
            {message.text}
          </Text>
        </View>
      </View>
    );
  }
}

MessageRowContainer.propTypes = {
  message: PropTypes.object.isRequired,
}

export default MessageRowContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderRadius: 5,

  },
  bubbleView: {
    backgroundColor: '#1E90FF',
    flex: 1,
    borderRadius: 8,
    marginTop:4,
    marginBottom: 4,
    padding: 8,


  },
  userText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  messageText: {
    flex: 1,
    color: 'white',
    fontSize: 16
  }

});
