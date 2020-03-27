import React, { Component } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import Navigator from "./Navigator";
var corPadrao = null;
import Rgba from "rgba-convert";

export default class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.styles = this.tratarStyle(props); //StyleSheet.create({view:this.tratarStyle(props),box:{   alignSelf: "stretch",   flex:1 , }})
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      this.styles = this.tratarStyle(nextProps);
    }
    return true;
  }

  isIphoneX() {
    const dimen = Dimensions.get("window");

    return (
      Platform.OS === "ios" &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (dimen.height === 812 || dimen.width === 812)
    );
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
      if (this.props.superStyle && typeof this.props.superStyle === "object") {
        lista.push(this.props.superStyle);
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
    if (!style.height) {
      style.height = 0;
    }
    var box = {
      alignSelf: "stretch",
      flex: 1,
      height: style.height,
      padding: 0,
      paddingTop: 0,
      backgroundColor: "rgba(0,0,0,0)"
    };
    var shadow = {};
    if (Platform.OS === "android") {
      if (Platform.Version >= 21) {
        if (!this.props.removeShadow) {
          shadow.elevation = 5;
        }
        if (this.props.activity) {
          if (!this.props.activity.props.modal) {
            style.height = style.height + 20;
            style.paddingTop = 20;
          }
        } else {
          style.height = style.height + 20;
          style.paddingTop = 20;
        }
      } else {
        // style.borderBottomWidth= 1;
        // style.borderBottomStyle= "solid";
        // style.borderBottomColor="rgba(0,0,0,0.3)";
      }
    } else {
      if (this.isIphoneX()) {
        style.height = style.height + 30;
        style.paddingTop = 30;
      } else {
        style.height = style.height + 15;
        style.paddingTop = 15;
      }
      if (!this.props.removeShadow) {
        shadow.shadowColor = "#000000";
        shadow.shadowOpacity = 0.5;
        shadow.shadowRadius = 2;
        shadow.shadowOffset = {
          height: 1,
          width: 0
        };
      }
      style.zIndex = 1000;
    }
    style.alignSelf = "stretch";
    if (corPadrao) {
      style.backgroundColor = corPadrao;
    }

    this.backgroundColor = style.backgroundColor;
    // Navigator.setStyle({statusBarColor: this.backgroundColor})
    return StyleSheet.create({ view: style, box: box, shadow: shadow });
    // return {view:style,box:{   alignSelf: "stretch",   flex:1  } };
  }

  getStyle() {
    var cor = Rgba.obj(this.backgroundColor ? this.backgroundColor : "#000");
    if (cor.r > 125 && cor.g > 125 && cor.b > 125) {
      return "dark-content";
    } else {
      return "light-content";
    }
  }

  render() {
    // console.log(this);
    var translucent = false;
    if (Platform.OS == "android" && Platform.Version >= 21) {
      translucent = true;
    }
    return (
      <View style={[this.styles.view, this.styles.shadow]}>
        <StatusBar
          backgroundColor={translucent ? "rgba(0,0,0,0)" : this.backgroundColor}
          translucent={translucent}
          barStyle={this.getStyle()}
        />

        <View style={[this.styles.view, this.styles.box]}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

TitleBar.setCor = function(cor) {
  corPadrao = cor;
};
