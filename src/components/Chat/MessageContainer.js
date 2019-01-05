import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MessageRow from './MessageRow'
import firebaseService from '@utils/firebase'

class MessageContainer extends Component {

  render() {
    const {message}=this.props;
    const isCurrentUser = firebaseService.auth().currentUser.uid == this.props.message.user.id;  //Checking for the current user
    return (
      <MessageRow
        message={message}
        isCurrentUser={isCurrentUser}
      />
    );
  }
}

MessageContainer.propTypes = {
  message: PropTypes.object.isRequired,
}

export default MessageContainer
