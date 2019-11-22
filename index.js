import React, { Component } from 'react';
import {View,Text,FlatList} from 'react-native';
import FlatListRow from '../src/FlatListRow';

export default class Test extends Component{

    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,  //this state will shows no screen till the timout 
          responseData: {}
        };
      }

      componentWillMount() {
     
      }
    
      componentDidMount() {
          this.getStudentData()
      }

      async getStudentData() {
        try {
          let response = await fetch(
            'http://www.mocky.io/v2/5d889c8a3300002c0ed7da42',
          );
          let responseJson = await response.json();
          console.log(responseJson)
          alert(JSON.stringify(responseJson.items))
          this.setState({responseData:responseJson})
        } catch (error) {
          console.error(error);
          alert(error)
        }
      }

      render() {
        return (
          <View>
           <FlatList
        data={this.state.responseData.items}
        keyExtractor={(item, index) => item.index}
        renderItem={({ item }) => (<FlatListRow data={item}/>)}
      />
          </View>
        );
      }
}