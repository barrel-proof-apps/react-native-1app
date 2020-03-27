'use strict';

import React, { Component } from 'react';

import { Modal, Alert, StyleSheet } from 'react-native';

import ApiUteis from '../api/uteis.js';
import TouchableOpacity from './TouchableOpacity';
import View from './View';
import Icon from './Icon';
import Text from './Text';
import Image from './Image';
import ImageUpload from './ImageUpload';
import TextInput from './inputtext';

var host = "";

export default class FotosUpload extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = { open: false, lista: props.value ? props.value : [],
      label: props.label, item: props.value ? props.value[0] : null, pos: 0 };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      nextState.lista = nextProps.value ? nextProps.value : [];
      nextState.label = nextProps.label;
      nextState.item = nextState.lista[0];
    }
    return true;
  }

  novo() {
    this.state.item = {};
    this.state.lista.push(this.state.item);
    this.setState({ item: this.state.item, pos: this.state.lista.length - 1 });
  }
  delet() {
    this.state.lista.splice(this.state.pos, 1);
    this.setState({ item: this.state.item, pos: 0 });
  }
  render() {
    var style = {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      minHeight: 150,
      // padding:3,
      // border:"1px solid #ccc",
      minWidth: 100,
      alignSelf: "stretch",
      flex: 1
    };

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
    if (!this.state.item) {
      this.state.item = {};
      this.state.lista.push(this.state.item);
    }
    var styleMarcador = {
      width: 50,
      height: 50,
      backgroundColor: "rgba(0,0,0,0.5)",
      marginRight: 2,
      marginTop: 5,
      // padding:3,
      // border:"1px solid #ccc",
      alignItems: "center",
      borderRadius: 5,
      justifyContent: "center"
    };

    // return (
    //   <View></View>
    // )
    var numero = this.state.pos + 1;
    return React.createElement(
      View,
      { style: style },
      React.createElement(ImageUpload, { label: this.state.label, style: {
          "alignSelf": "stretch",
          backgroundColor: "#ccc",
          "flex": 1
        }, onChange: text => {
          this.state.item.url_img = text;
          var item = this.state.item;
          var pos = this.state.pos;
          if (this.props.onChangeText) {
            this.props.onChangeText(this.state.lista, this.state.pos, text);
          }
          if (this.props.onChange) {
            this.props.onChange(this.state.lista, this.state.pos, text);
          }
          this.setState({ pos: pos, item: item });
        }, resizeMode: "cover", value: this.state.item.url_img }),
      React.createElement(
        View,
        { style: {
            top: 0,
            right: 0,
            height: 60,
            padding: 5,
            width: 150,
            "flexDirection": "row",
            justifyContent: "flex-end",
            "alignItems": "flex-end",
            "position": "absolute"
          } },
        this.props.description ? React.createElement(
          TouchableOpacity,
          { style: [styleMarcador, {}], onPress: () => {
              this.setState({ open: true });
            } },
          React.createElement(Icon, { style: {
              "color": "#fff",
              "fontSize": 25
            }, fromFontFamily: "Material Icons", icon: "create"
          })
        ) : null,
        numero > 1 ? React.createElement(
          TouchableOpacity,
          { style: [styleMarcador, {}], onPress: () => {
              Alert.alert('Apagar', 'Deseja apagar este item N:' + numero + '?', [{ text: 'Sim', onPress: () => this.delet() }, { text: 'Não', onPress: () => console.log() }]);
            } },
          React.createElement(Icon, { style: {
              "color": "#fff",
              "fontSize": 25
            }, fromFontFamily: "Material Icons", icon: "delete"
          })
        ) : null
      ),
      React.createElement(
        Modal,
        {
          animationType: "fade",

          transparent: true,
          onRequestClose: () => {
            this.setState({ open: false });
          },
          visible: this.state.open
        },
        React.createElement(
          View,
          { style: styles.view },
          React.createElement(
            View,
            { style: styles.view1 },
            React.createElement(
              View,
              { style: styles.view2 },
              React.createElement(
                TouchableOpacity,
                { style: styles.bottom, onPress: () => {
                    this.setState({
                      open: false
                    });
                  } },
                React.createElement(Icon, { style: styles.icon, fromFontFamily: "Material Icons", icon: "close" })
              ),
              React.createElement(Text, { style: styles.label, text: "Informações da foto  " + (this.state.numero ? "número:" + this.state.numero : "") }),
              React.createElement(TouchableOpacity, { style: styles.bottom1 })
            ),
            React.createElement(
              View,
              { style: styles.view3 },
              React.createElement(TextInput, { style: styles.nome, value: this.state.item.nome, onChange: value => {
                  this.state.item.nome = value;
                }, ref: v => this.nome = v, keyboardType: "default", secureTextEntry: false,
                multiline: false, label: "Título" }),
              React.createElement(TextInput, { style: styles.descricao, value: this.state.item.descricao, onChange: value => {
                  this.state.item.descricao = value;
                }, ref: v => this.descricao = v, keyboardType: "default", secureTextEntry: false,
                multiline: true, label: "Descrição" })
            )
          )
        )
      ),
      React.createElement(
        View,
        {
          style: { flexWrap: "wrap", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", alignSelf: "stretch" } },
        this.state.lista.map((object, pos) => {
          return React.createElement(
            TouchableOpacity,
            { key: pos + "k", style: [styleMarcador, { backgroundColor: pos == this.state.pos ? "#000" : "#777" }],
              onPress: () => {
                this.setState({ pos: pos, item: object });
              } },
            React.createElement(
              Text,
              { style: { color: "#ffffff", fontWeight: "bold", fontSize: 20 } },
              pos + 1
            )
          );
        }),
        React.createElement(
          TouchableOpacity,
          { style: styleMarcador, onPress: () => {
              this.novo();
            } },
          React.createElement(Icon, { icon: "add", style: { color: "#fff", fontSize: 35 } })
        ),
        React.createElement(View, { style: { "flex": 1, flexWrap: "wrap", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", alignSelf: "stretch" } })
      )
    );
  }
}
var styles = StyleSheet.create({

  "view": {
    "flex": 1,
    "flexDirection": "column",
    "alignItems": "flex-start",
    "justifyContent": "flex-start",
    "flexWrap": "nowrap",
    "position": "relative",
    "padding": 30,
    "backgroundColor": "rgba(0,0,0,0.3)"
  },
  "view1": {
    "alignSelf": "stretch",
    // "flex": 1,
    padding: 5,
    "flexDirection": "column",
    "alignItems": "flex-start",
    "justifyContent": "flex-start",
    "flexWrap": "nowrap",
    borderRadius: 5,
    "position": "relative",
    "backgroundColor": "rgba(255,255,255,1)"
  },
  "view2": {
    "alignSelf": "stretch",
    "flexDirection": "row",
    "alignItems": "flex-start",
    "justifyContent": "flex-start",
    "flexWrap": "nowrap",
    "position": "relative"
    // "height": 50
  },
  "bottom": {
    "alignSelf": "stretch",
    "justifyContent": "center",
    "alignItems": "center",
    "height": 50,
    "flexDirection": "column",
    "flexWrap": "nowrap",
    "position": "relative",
    "width": 50
  },
  "icon": {
    "color": "rgba(150,150,145,1)",
    "fontSize": 25
  },
  "label": {
    "textAlign": "center",
    "flexWrap": "wrap",
    "color": "rgba(0,0,0,1)",
    "alignSelf": "stretch",
    "flex": 1
  },
  "bottom1": {
    "alignSelf": "stretch",
    "justifyContent": "center",
    "alignItems": "center",
    "height": 50,
    "flexDirection": "column",
    "flexWrap": "nowrap",
    "position": "relative",
    "width": 50
  },
  "view3": {
    "alignSelf": "stretch",
    // "flex": 1,
    "flexDirection": "column",
    "alignItems": "flex-start",
    "justifyContent": "flex-start",
    "flexWrap": "nowrap",
    "position": "relative",
    "padding": 10
  },
  "nome": {
    "minHeight": 35,
    "color": "rgba(0,0,0,1)",
    "alignSelf": "stretch",
    "textAlign": "left",
    "flexWrap": "nowrap"
  },
  "descricao": {
    "minHeight": 35,
    "color": "rgba(0,0,0,1)",
    "alignSelf": "stretch",
    "textAlign": "left",
    "flexWrap": "nowrap",
    "marginTop": 5
  }
});
