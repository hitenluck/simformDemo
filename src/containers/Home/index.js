import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
} from 'react-native';
import { Button,UserList} from '@components'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/actions';
import { connect } from 'react-redux';
import firebaseService from '@utils/firebase'
import { Actions } from 'react-native-router-flux';
import Loader from '@components/Loader'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.getUsersList()  //loading the data of userlist 
  }

  render() {
    const {userList,isLoading} = this.props
    return (
      <View  style={{flex:1,justifyContent: 'center'}} >
        <Loader isLoading={isLoading} />
        <Button  onPress={()=>{this.props.logout()}}>
          <Text>LOGOUT</Text>
        </Button>
        <FlatList
          data={userList}
          keyExtractor={item => item.time}
          renderItem={ ({item}) =><UserList  message={item} />}
        />
      </View>

    );
  }
}

const mapStateToProps = state => ({
  userList:state.appReducer.userList,
  isLoading: state.appReducer.isLoading,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);
