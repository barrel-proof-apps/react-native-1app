'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Switch, Text, ActivityIndicator } from 'react-native';

export default class Progresso extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      nextState.value = nextProps.value;
    }
    return true;
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
    var cor = null;
    if (style.color) {
      cor = style.color;
      delete style.color;
    }

    if (this.props.label) {
      return React.createElement(
        View,
        { style: style },
        React.createElement(
          View,
          { style: {
              flex: 1,
              "flexDirection": "column",
              "justifyContent": "flex-start",
              "alignItems": "flex-start"
            } },
          React.createElement(
            Text,
            { style: [{ fontSize: 11, padding: 0, margin: 0, marginBottom: 3, color: "#999" }] },
            this.props.label
          ),
          React.createElement(Switch, { style: style, value: this.state.value, onValueChange: value => {
              if (this.props.onChange) {
                this.props.onChange(value);
              }
              this.setState({ value: value });
            }
          })
        )
      );
    }

    return React.createElement(Switch, { style: style, value: this.state.value, onValueChange: value => {
        if (this.props.onChange) {
          this.props.onChange(value);
        }
        this.setState({ value: value });
      } });
  }
}