var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
var idiomas = null;
export default class TextView extends Component {
  constructor(props) {
    super(props);
    this.state = { text: props.text };
    this.styles = StyleSheet.create(this.tratarStyle(props));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      this.styles = StyleSheet.create(this.tratarStyle(nextProps));
      nextState.text = nextProps.text;
    }
    return true;
  }
  tratarStyle(props) {
    var style = {
      flexWrap: "wrap",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start"
    };

    if (props.style) {
      var lista = [];
      if (Array === props.style.constructor) {
        lista = props.style;
      } else {
        lista.push(props.style);
      }
      if (props.superStyle && typeof props.superStyle === "object") {
        lista.push(props.superStyle);
      }
      for (var a = 0; a < lista.length; a++) {
        var st = lista[a];
        if (typeof st === "object" && st !== null) {
          //nada
        } else if (st) {
          st = StyleSheet.flatten(props.style);
        } else if (!st) {
          continue;
        }
        var tags = Object.keys(st);
        for (var i = 0; i < tags.length; i++) {
          style[tags[i]] = st[tags[i]];
        }
      }
    }

    if (style.textAlign == "center") {
      style.alignItems = "center";
    }
    if (style.textAlign == "right") {
      style.alignItems = "flex-end";
    }
    var styleText = {};
    if (style.color) {
      styleText.color = style.color;
    }
    if (style.fontSize) {
      styleText.fontSize = style.fontSize;
    }
    if (style.fontFamily) {
      styleText.fontFamily = style.fontFamily;
    }
    if (style.fontWeight) {
      styleText.fontWeight = style.fontWeight;
    }
    if (style.fontStyle) {
      styleText.fontStyle = style.fontStyle;
    }
    if (style.textAlign) {
      styleText.textAlign = style.textAlign;
    }
    if (style.textDecorationLine) {
      styleText.textDecorationLine = style.textDecorationLine;
    }
    delete style.textDecorationLine;
    delete style.color;
    delete style.fontSize;
    delete style.fontFamily;
    delete style.fontWeight;
    delete style.textAlign;
    delete style.fontStyle;

    style.backgroundColor = "rgba(0,0,0,0)";

    this.superProps = {};
    var list = Object.keys(this.props);
    for (var i = list.length - 1; i >= 0; i--) {
      let tag = list[i];
      if (tag == "text") {
        continue;
      }
      this.superProps[tag] = this.props[tag];
    }

    return { view: style, styleText: styleText };
  }
  recortaString(string, pos) {
    if (!string) {
      return "";
    }
    if (!pos) {
      return string;
    }
    var re = "";
    // if (contemString(string, "#")) {
    //   var numero = string.split("#")[1];
    var pos = parseInt(pos + "");
    if (pos < string.length - 1) {
      re = string.substring(0, pos) + "...";
    } else {
      re = string;
    }
    // }
    return re;
  }

  render() {
    var text = this.props.text;
    if (!text && text + "" != "0") {
      // text = this.props.children;
      return React.createElement(
        Text,
        this.props,
        this.props.children ? this.props.children : ""
      );
    } else {
      text = text + "";
    }
    if (this.props.idiomas && idiomas) {
      text = this.props.idiomas[idiomas] ? this.props.idiomas[idiomas] : text;
    }
    if (this.props.limit) {
      text = this.recortaString(text, this.props.limit);
    }

    return React.createElement(
      View,
      { style: this.styles.view },
      React.createElement(
        Text,
        _extends({}, this.superProps, { style: this.styles.styleText }),
        text
      )
    );
  }
}

TextView.setIdioma = function (tag) {
  idiomas = tag;
};