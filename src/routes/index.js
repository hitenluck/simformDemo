import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Home from '@containers/Home';
import OneToOneChat from '@containers/Home/OneToOneChat'
import Login from '@containers/RegisterLogin/Login'
import Register from '@containers/RegisterLogin/Register'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/actions';
import { connect } from 'react-redux';



class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };

  }


  componentWillMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 3000);
  }

  componentDidMount() {

    this.setState({ isLoading: true });
    this.props.restoreSession()
  }

   routesFunction() {
     const {user} =this.props;
    return (
      <Scene
        key="root"
        panHandlers={null} // for disable swiping back in IOS
        duration={0} // to avoid sliding animation on IOS
        hideNavBar="hideNavBar"
        hideTabBar="hideTabBar">
        <Scene key="Home" title="Home" initial={user?true:false}   component={Home} />
        <Scene key="OneToOneChat" title="OneToOneChat"   component={OneToOneChat} />
        <Scene key="Login" title="Login"   initial={user?false:true}  component={Login} />
        <Scene key="Register" title="Register"    component={Register} />
      </Scene>
    );
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading === true) {
      return null;
    }
    return (
      <Router>
        { this.routesFunction() }
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  user:state.appReducer.user,
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Routes);
