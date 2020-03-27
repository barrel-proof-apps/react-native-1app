'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from 'react';

import { StyleSheet, View, RefreshControl, ActivityIndicator } from 'react-native';

export default class ApiRefreshControl extends Component {
  constructor(props) {
    super(props);
    this.state = { create: true, refreshing: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ refreshing: this.props.refreshing });
    }, 10);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      nextState.refreshing = nextProps.refreshing;
    }
    return true;
  }

  render() {
    return React.createElement(RefreshControl, _extends({}, this.props, { refreshing: this.state.refreshing ? true : false }));
  }
}