var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from "react";
import { Image, View, Platform, Dimensions, TouchableOpacity, Modal, StyleSheet, ImageBackground } from "react-native";

export default class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = { load: false, open: false };
  }

  render() {
    var source = this.props.source;
    let has_source = true;
    if (!source || typeof source === "object" && !source.uri) {
      has_source = false;
    }
    var lista = [];
    if (this.props.style) {
      if (Array === this.props.style.constructor) {
        lista = this.props.style;
      } else {
        lista.push(this.props.style);
      }
      if (this.props.heightScreen || this.props.widthScreen || has_source) {
        var style = {};
        if (this.props.widthScreen) {
          style.width = Dimensions.get("window").width;
        }
        if (this.props.heightScreen) {
          style.height = Dimensions.get("window").height;
        }
        if (has_source) {
          style.backgroundColor = "rgba(0,0,0,0)";
        }
        lista.push(style);
      }
    }

    if (!has_source) return React.createElement(
      View,
      { style: lista },
      this.props.children
    );

    if (this.props.children) {
      return React.createElement(
        ImageBackground,
        _extends({}, this.props, { source: source, style: lista }),
        this.props.children
      );
    }
    return React.createElement(Image, _extends({}, this.props, { style: lista }));
  }
}

ImageView.resizeMode = Image.resizeMode;