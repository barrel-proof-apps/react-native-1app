'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from 'react';

import { KeyboardAvoidingView, StyleSheet, View, Platform, ActivityIndicator } from 'react-native';

export default class Content extends Component {

  render() {

    if (this.props.keyboard && Platform.OS == 'ios') {
      return React.createElement(
        KeyboardAvoidingView,
        _extends({}, this.props, { behavior: this.props.behavior ? this.props.behavior : "padding" }),
        this.props.children
      );
    }

    return React.createElement(
      View,
      this.props,
      this.props.children
    );
  }
}