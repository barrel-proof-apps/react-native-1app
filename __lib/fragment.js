'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Navigator } from 'react-native';

export default class Fragment extends Component {
  constructor(props) {
    super(props);
    this.state = { page: null };
  }

  setPage(view) {
    this.setState({ page: view });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      // Dados.clonarHeranca(nextProps, nextState);
    }
    return true;
  }

  render() {
    if (this.state.page) {
      return React.createElement(
        View,
        { style: this.props.style },
        this.state.page
      );
      // return (
      //   <View style={this.props.style} >
      //   <this.state.page activity={this.props.activity} menuLeft={this.props.activity.menu_left}
      //     menuRight={this.props.activity.menu_right} navigator={this.props.navigator} fragment={this}  />
      //   </View>
      // );
    }
    return React.createElement(
      View,
      { style: this.props.style },
      this.props.children
    );
  }
}