'use strict';
import React, { Component } from 'react';

import  {
  StyleSheet,
  View,
  Navigator,
} from 'react-native';


export default  class Fragment extends Component {
  constructor(props) {
    super(props);
    this.state = { page : null  };
  }

  setPage(view){
    this.setState({page:view});
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      // Dados.clonarHeranca(nextProps, nextState);
    }
    return true;
  }

  render() {
    if(this.state.page){
      return (
        <View style={this.props.style} >
          {this.state.page}
        </View>
      );
    }
    return (
      <View style={this.props.style}  >
        {this.props.children}
      </View>
    );
  }
}
