"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from "react";
import { StyleSheet, View, Platform, TextInput as Input, Text } from "react-native";
import { TextField } from "react-native-material-textfield-1app";
import VMasker from "vanilla-masker";

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      open: false
    };
    this.styles = StyleSheet.create(this.tratarStyle(props));
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      this.styles = StyleSheet.create(this.tratarStyle(nextProps));
    }
    return true;
  }

  isFocused() {
    return this.input.isFocused();
  }

  focus() {
    return this.input.focus();
  }

  tratarStyle(props) {
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
    this.color = "#000";
    if (style.color) {
      this.color = style.color;
    }
    var styleView = { marginTop: -8 };
    if (style.margin) {
      styleView.margin = style.margin;
    }
    if (style.marginTop) {
      styleView.marginTop = style.marginTop;
    }
    if (style.marginLeft) {
      styleView.marginLeft = style.marginLeft;
    }
    if (style.marginRight) {
      styleView.marginRight = style.marginRight;
    }
    if (style.marginBottom) {
      styleView.marginBottom = style.marginBottom;
    }

    if (style.width) {
      styleView.width = style.width;
    }
    if (style.flex) {
      styleView.flex = style.flex;
    }
    if (style.alignSelf) {
      styleView.alignSelf = style.alignSelf;
    }

    delete style.margin;
    delete style.marginTop;
    delete style.marginLeft;
    delete style.marginRight;
    delete style.marginBottom;

    this.fontSize = 15;
    if (style.fontSize) {
      this.fontSize = style.fontSize;
    }
    return {
      style,
      styleView,
      box: {
        alignSelf: "stretch",
        flex: 1
      }
    };
  }

  getStringLimit(text) {
    if (!this.props.limit || !text) {
      return text;
    }
    var limit = parseInt(this.props.limit);
    if (text && text.length) {
      if (text.length > limit && limit > 0) {
        text = text.substring(0, limit);
      }
    }
    return text;
  }
  onChange(text) {
    if (this.props.onChange) {
      var set = false;
      if (this.props.mask) {
        text = VMasker.toPattern(text, this.props.mask);
        set = true;
      }
      text = this.getStringLimit(text);
      if (this.props.money && text) {
        set = true;
        text = (text + "").replace(this.props.money + " ", "");
      }
      this.props.onChange(text);
      // console.log(text)
      if (set) {
        this.input.setNativeProps({
          text: text
        });
      }
    }
  }
  render() {
    let value = this.props.value;
    if (this.props.money && value) {
      value = this.props.money + " " + this.props.value;
    }
    var style = [];
    if (this.props.inputNative) {
      if (this.props.style) {
        if (this.props.style.push) {
          this.props.style.push({ padding: 0 });
          style = this.props.style;
        } else {
          style = [{ padding: 0 }, this.props.style];
        }
      }
      if (this.props.errorText) {
        return React.createElement(
          View,
          { style: style },
          React.createElement(Input, _extends({
            ref: v => this.input = v,
            autoCorrect: false,
            autoCapitalize: this.props.autoCapitalize ? this.props.autoCapitalize : "none",
            placeholderTextColor: this.color,
            underlineColorAndroid: "rgba(0,0,0,0)"
          }, this.props, {
            onChangeText: text => {
              this.onChange(text);
            },
            style: [styles.textinput, {}],
            onChange: null
          })),
          React.createElement(
            Text,
            { style: styles.text },
            this.props.errorText
          )
        );
      }
      return React.createElement(Input, _extends({
        ref: v => this.input = v,
        autoCorrect: false,
        autoCapitalize: this.props.autoCapitalize ? this.props.autoCapitalize : "none",
        placeholderTextColor: this.color,
        underlineColorAndroid: "rgba(0,0,0,0)"
      }, this.props, {
        value: value || value == 0 ? value + "" : "",
        onChangeText: text => {
          this.onChange(text);
        },
        style: style,
        onChange: null
      }));
    }
    return React.createElement(TextField, _extends({
      autoCorrect: false,
      autoCapitalize: this.props.autoCapitalize ? this.props.autoCapitalize : "none",
      ref: v => this.input = v,
      errorColor: "#777",
      fontSize: this.fontSize,
      tintColor: this.color,
      baseColor: this.color,
      textColor: this.color,
      error: this.props.errorText
    }, this.props, {
      errorText: null,
      value: value || value == 0 ? value + "" : "",
      label: this.props.label ? this.props.label : "-",
      style: this.styles.box,
      containerStyle: this.styles.styleView,
      onChangeText: value => {
        this.onChange(value);
      },
      onChange: null
    }));
  }
}

var styles = StyleSheet.create({
  content: {
    backgroundColor: "rgba(255,255,255,1)",
    alignSelf: "stretch",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  view: {
    alignSelf: "stretch",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  textinput: {
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    textAlign: "left",
    fontWeight: "normal"
  },
  text: {
    textAlign: "left",
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    fontWeight: "bold",
    fontSize: 11
  }
});