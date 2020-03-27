'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Platform, ActivityIndicator } from 'react-native';

export default class Progresso extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    // var cor = null;
    var size = 0;
    if (Platform.OS !== 'android') {
      size = style.height ? style.height : 50;
      if (size > 50) {
        size = "large";
      } else {
        size = "small";
      }
    } else {
      size = style.height ? style.height : 50;
    }
    // alert("ok")
    style.height = 30;
    style.width = 30;
    return React.createElement(
      View,
      { style: {
          backgroundColor: "rgba(0,0,0,0)",
          "flexDirection": "column",
          "alignItems": "center",
          "justifyContent": "center",
          minHeight: style.height,
          minWidth: style.width
        } },
      React.createElement(ActivityIndicator, {
        color: style.color,
        style: [{ backgroundColor: "rgba(0,0,0,0)" }],
        size: size
      })
    );
  }
}