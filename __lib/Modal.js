'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from 'react';

import { Modal, StyleSheet, View, Platform, ActivityIndicator } from 'react-native';
// import { Navigation } from 'react-native-navigation';

var styles = StyleSheet.create({ view: {} });
export default class EdiView extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: props.visible };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      nextState.visible = nextProps.visible;
    }
    if (!nextProps.visible && nextProps.visible != this.state.visible) {
      // Navigation.dismissModal({
      //   animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
      // });
    }
    return true;
  }

  render() {

    return React.createElement(Modal, _extends({}, this.props, { visible: this.state.visible }));
  }
}