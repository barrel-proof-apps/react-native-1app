'use strict';
import React, { Component } from 'react';

import  {
  Modal,
  StyleSheet,
  View,Platform,
  ActivityIndicator,
} from 'react-native';
// import { Navigation } from 'react-native-navigation';

var styles = StyleSheet.create({view:{}});
export default  class EdiView extends Component {
  constructor(props) {
    super(props);
    this.state = {visible:props.visible};
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps!= this.props){
       nextState.visible = nextProps.visible
    }
    if(!nextProps.visible && nextProps.visible != this.state.visible ){
      // Navigation.dismissModal({
      //   animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
      // });
    }
    return true;
  }


  render() {



    return (
      <Modal {...this.props} visible={this.state.visible} />
    );
  }
}
