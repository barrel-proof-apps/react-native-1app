'use strict';
import React, { Component } from 'react';

import  {
  StyleSheet,
  View,RefreshControl,
  ActivityIndicator,
} from 'react-native';


export default  class ApiRefreshControl extends Component {
  constructor(props) {
    super(props);
    this.state = { create:true ,refreshing :false};
  }

  componentDidMount() {
    setTimeout( () =>{
      this.setState({refreshing: this.props.refreshing});
    }, 10);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps!= this.props){
      nextState.refreshing = nextProps.refreshing;
    }
    return true;
  }

  render() {
    return (
      <RefreshControl  {...this.props} refreshing={this.state.refreshing?true:false}  />
    );
  }
}
