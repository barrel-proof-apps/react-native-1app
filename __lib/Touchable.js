'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from 'react';

import { StyleSheet, TouchableOpacity, Platform, ActivityIndicator, View, TouchableNativeFeedback } from 'react-native';

export default class EdiTouchableOpacity extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  render() {
    var style = {};

    if (this.props.style) {
      var lista = [];
      if (Array === this.props.style.constructor) {
        lista = this.props.style;
      } else {
        lista.push(this.props.style);
      }
      for (var a = 0; a < lista.length; a++) {
        var st = lista[a];
        if (typeof st === "object" && st !== null) {
          //nada
        } else if (st) {
          st = StyleSheet.flatten(this.props.style);
        } else if (!st) {
          continue;
        }
        var tags = Object.keys(st);
        for (var i = 0; i < tags.length; i++) {
          style[tags[i]] = st[tags[i]];
        }
      }
    }

    if (this.props.disabled) {
      style.opacity = 0.5;
      return React.createElement(
        View,
        { style: style },
        this.props.children
      );
    }

    if (this.props.elevation) {
      if (Platform.OS === 'android') {
        if (Platform.Version >= 21) {
          style.elevation = 5;
        }
      } else {
        style.shadowColor = "#000000";
        style.shadowOpacity = 0.5;
        style.shadowRadius = Number(this.props.elevation);
        style.shadowOffset = {
          height: 1,
          width: 0
        };
      }
    }

    // return (
    //   <TouchableNativeFeedback style={{borderRadius:style.borderRadius}}  {...this.props} disabled={this.props.disabled}   onPress={ () => {
    //       if(this.props.onPress){
    //         this.props.onPress();
    //       }
    //     } } background={TouchableNativeFeedback.SelectableBackground()}>
    //     <View style={style}>
    //       {this.props.children}
    //     </View>
    //   </TouchableNativeFeedback>
    // );

    return React.createElement(
      TouchableOpacity,
      _extends({ style: style }, this.props, { disabled: this.props.disabled, onPress: () => {
          if (this.props.onPress) {
            this.props.onPress();
          }
        } }),
      this.props.children
    );
  }
}