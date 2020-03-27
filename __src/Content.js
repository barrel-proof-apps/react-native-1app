'use strict';
import React, { Component } from 'react';

import  {
  KeyboardAvoidingView,
  StyleSheet,
  View,Platform,
  ActivityIndicator,
} from 'react-native';

 export default  class Content extends Component {
 

  render() {

    if(this.props.keyboard && Platform.OS == 'ios'){
      return (
        <KeyboardAvoidingView  {...this.props} behavior={this.props.behavior ?this.props.behavior: "padding"}  >
          {this.props.children}
        </KeyboardAvoidingView>
      );
    }

    return (
      <View {...this.props} >
        {this.props.children}
      </View>
    );
  }
}
 