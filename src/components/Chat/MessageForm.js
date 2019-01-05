import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity,  StyleSheet,Text } from 'react-native'
import PropTypes from 'prop-types'
import { colors } from '@themes';

class MessageForm extends Component {
  
  handleMessageChange=(message)=>{
    this.props.setMessage(message)
  }

  render() {
    const {value}=this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={"Please Write message"}
          returnKeyType='send'
          onChangeText={this.handleMessageChange}
          underlineColorAndroid={'transparent'}
          value={value}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.props.sendMessage}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  MessageForm.propTypes = {
    setMessage: PropTypes.func.isRequired,
    value: PropTypes.string
  }

  export default MessageForm

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      minWidth: '100%',
      backgroundColor: colors.colorChatBoxbackground,
      borderTopColor:colors.colorChatboxBorderTop,
      borderTopWidth: 1
    },
    textInput: {
      flex: 1,
      backgroundColor: '#ffffff',
      height: 40,
      margin: 10,
      borderRadius: 5,
      padding: 3
    },
    button: {
      flexShrink: 0,
      width: 80,
      height: 40,
      marginTop: 10,
      marginRight: 10,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent:'center',
      borderWidth: 1,
      borderRadius:8,
    }
  });
