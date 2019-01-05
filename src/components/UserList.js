import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { colors} from '@themes'
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types'

const UserList = props =>{
  return(
    <TouchableOpacity style={styles.headerView}
      activeOpacity={0.8}
      key={props.message.id}

      onPress={()=>Actions.OneToOneChat({pushToken:props.message.pushToken,receiverId:props.message.id})}
      >
        <View style={styles.bodyView}>
          <Text style={styles.username}>{props.message.name}</Text>
          <Text  style={styles.password}>{props.message.email}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  

  UserList.propTypes = {
    message:PropTypes.object.isRequired
  };


  export default UserList;

  const styles = StyleSheet.create({
    headerView: {
      borderWidth: 0.5,
      borderColor: colors.appColor,
      borderRadius: 8,
      marginTop: 4,
      marginBottom: 4,
      marginLeft: 8,
      marginRight: 8,
    },
    bodyView:{
      padding: 8,
    },
    username:{
      fontSize: 18,
      color:'black'
    }

  });
