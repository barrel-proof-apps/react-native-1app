'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from 'react';

import { StyleSheet, TouchableOpacity, Platform, ActivityIndicator, View, TouchableNativeFeedback } from 'react-native';

export default class EdiTouchableOpacity extends Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({ view: this.tratarStyle(props) });
    this.ativo = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      this.styles = StyleSheet.create({ view: this.tratarStyle(nextProps) });
    }
    return true;
  }
  tratarStyle(props) {
    var style = {};

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
    if (props.elevation) {
      if (Platform.OS === 'android') {
        if (Platform.Version >= 21) {
          style.elevation = props.elevation;
        }
      } else {
        style.shadowColor = "#000000";
        style.shadowOpacity = 0.5;
        style.shadowRadius = Number(props.elevation);
        style.shadowOffset = {
          height: 1,
          width: 0
        };
      }
    }

    return style;
  }

  render() {

    if (this.props.disabled) {
      // style.opacity = 0.5;
      return React.createElement(
        View,
        { style: this.styles.view },
        this.props.children
      );
    }

    // style.elevation = 5;


    // if(!style.borderRadius){
    //   return (
    //     <TouchableNativeFeedback style={{borderRadius:style.borderRadius}}  {...this.props} disabled={this.props.disabled}   onPress={ () => {
    //         if(this.props.onPress){
    //           this.props.onPress();
    //         }
    //       } } background={TouchableNativeFeedback.SelectableBackground()}>
    //       <View style={style}>
    //         {this.props.children}
    //       </View>
    //     </TouchableNativeFeedback>
    //   );
    // }
    // return (
    //   <View style={style} >
    //     <TouchableOpacity style={{flex:1,alignSelf:"stretch",padding:0,margin:0,flexDirection:style.flexDirection}}   disabled={this.props.disabled}   onPress={ () => {
    //         if(this.props.onPress){
    //           this.props.onPress();
    //         }
    //       } }>
    //       {this.props.children}
    //     </TouchableOpacity>
    //   </View>
    // );
    return React.createElement(
      TouchableOpacity,
      _extends({}, this.props, { style: this.styles.view, disabled: this.props.disabled, onPress: () => {

          if (this.props.onPress && this.ativo) {
            this.props.onPress();
            this.ativo = false;
            setTimeout(() => {
              this.ativo = true;
            }, 500);
          } else {
            setTimeout(() => {
              this.ativo = true;
            }, 500);
          }
        } }),
      this.props.children
    );
  }
}