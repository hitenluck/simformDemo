import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';
const Loader = props => {
  const {
    isLoading,
  } = props;
return (
    <Modal
      transparent={true}
      animationType={'none'}
      onRequestClose={() => null}
      visible={isLoading}>
      <View style={{justifyContent:'center',alignItems:'center',flex: 1}}>
      <ActivityIndicator size="large" color="#2196F3" /></View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

export default Loader;
