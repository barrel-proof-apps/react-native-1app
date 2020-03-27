'use strict';

import React, { Component } from 'react';
// var Modal   = require('react-native-modalbox');

import { Platform, StyleSheet, Text, View, TouchableHighlight, Modal, TouchableOpacity, Image, Dimensions, DeviceEventEmitter } from 'react-native';
import ListView from 'deprecated-react-native-listview'

export default class Progresso extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value, open: false, text: "Select here...", lista: props.lista };
    if (this.props.list) {
      this.state.lista = this.props.list;
    }
    this.state.text = this.getText(this.state.lista, props.value);
  }
  getText(lista, value) {
    if (!lista) {
      return;
    }
    if (lista) {
      for (var i = 0; i < lista.length; i++) {
        let item = lista[i];

        if (!item.value && item.objectId) {
          item.value = item.objectId;
        }
        if (!item.text && item.nome) {
          item.text = item.nome;
        }

        if (item.value + "" == value + "") {
          if (item.value && !item.text) {
            item.text = item.value;
          }
          return item.text;
        }
      }
    }
    if (this.props.first && !value && lista[0]) {
      setTimeout(() => {
        if (this.props.onChange && !value) {
          this.props.onChange(lista[0].value, lista[0], 0);
        }
      }, 100);
    }
    return "Escolha um item...";
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      nextState.value = nextProps.value;
      nextState.lista = nextProps.lista;
      if (nextProps.list) {
        nextState.lista = nextProps.list;
      }
      nextState.text = this.getText(nextState.lista, nextProps.value);
    }
    return true;
  }

  render() {
    var style = {
      // backgroundColor:"#000",
      borderBottomColor: "#777",
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      borderStyle: "solid"

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

    if (this.props.decorationColor) {
      style.borderBottomColor = this.props.decorationColor;
    }

    let color = style.color ? style.color : "#000";
    delete style.color;

    return React.createElement(
      View,
      { style: style },
      React.createElement(
        TouchableHighlight,
        { disabled: this.props.disabled, style: {
            flex: 1,
            // backgroundColor:"#ccc",
            // height:30,
            alignSelf: "stretch"
          }, underlayColor: 'rgba(224,224,224,1)', onPress: () => {
            this.setState({ open: true });
          } },
        React.createElement(
          View,
          { style: {
              flex: 1,

              "flexDirection": "column",
              "justifyContent": "flex-start",
              "alignItems": "flex-start"
            } },
          this.props.label ? React.createElement(
            Text,
            { style: [{ fontSize: 11, padding: 0, margin: 0, marginBottom: 3, color: style.borderBottomColor }] },
            this.props.label
          ) : null,
          React.createElement(
            Text,
            { style: {
                fontSize: style.fontSize ? style.fontSize : 15,
                "color": color,
                marginBottom: 5,
                "marginTop": 3
              } },
            this.state.text
          )
        )
      ),
      React.createElement(
        Modal,
        {
          animationType: "slide",
          transparent: true,
          visible: this.state.open,
          onRequestClose: () => {
            this.setState({ open: false });
          } },
        React.createElement(SelectInputList, { activity: this, first: this.props.first, onChange: (value, data, index) => {
            this.setState({ open: false, text: data ? data.text : "Escolha um item..." });
            if (this.props.onChange) {
              this.props.onChange(value, data, index);
            }
          }, lista: this.state.lista ? this.state.lista : [], value: this.props.value })
      )
    );
  }
}

class SelectInputList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heranca: {},
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      selectpos: -1
    };
    if (props.lista) {
      this.state.dataSource = this.state.dataSource.cloneWithRows(props.lista);
    }
    setTimeout(() => {
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(props.lista) });
      //alert("ok")
    }, 100);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      //alert("ok")
      // if(nextProps.lista){
      nextState.dataSource = this.state.dataSource.cloneWithRows(nextProps.lista);
      // }
      setTimeout(() => {
        this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.lista) });
      }, 100);
    }
    return true;
  }

  row_listview_1(rowData, sectionID, rowID) {
    var cor = "#f2f2f2";
    if (rowID + "" === this.state.selectpos + "") {
      cor = "#cccccc";
    }
    if (rowData.nome && !rowData.text) {
      rowData.text = rowData.nome;
    }
    if (!rowData.value && rowData.objectId) {
      rowData.value = rowData.objectId;
    }
    if (rowData.value && !rowData.text) {
      rowData.text = rowData.value;
    }
    // console.log(rowData);
    return React.createElement(
      TouchableHighlight,
      { style: { backgroundColor: cor, margin: 2 }, underlayColor: 'rgba(224,224,224,1)', onPress: () => {
          if (this.props.onChange) {
            this.props.onChange(rowData.value, rowData, rowID);
          }
          this.setState({ selectpos: rowID, open: false });
        } },
      React.createElement(
        View,
        { style: {

            padding: 15,
            "alignSelf": "stretch",
            "flexDirection": "row",
            "justifyContent": "flex-start",
            "alignItems": "center"
          } },
        React.createElement(
          Text,
          { style: {
              "fontSize": 15,
              "color": "rgba(0,0,0,1)"
            } },
          rowData.text
        )
      )
    );
  }

  render() {

    return React.createElement(
      View,
      { style: { flexDirection: "column", flex: 1, alignSelf: "stretch", backgroundColor: "rgba(0,0,0,0.8)" } },
      React.createElement(ListView, { style: {
          // backgroundColor:"#ccc",
          "alignSelf": "stretch",
          margin: 15,
          marginTop: 35,
          "flex": 1
        },
        dataSource: this.state.dataSource,
        renderRow: (rowData, sectionID, rowID) => {
          return this.row_listview_1(rowData, sectionID, rowID);
        }
      }),
      React.createElement(
        View,
        { style: {
            "alignSelf": "stretch",
            alignItems: "center",
            justifyContent: "center",
            "flexDirection": "row"
          } },
        !this.props.first ? React.createElement(
          TouchableHighlight,
          { style: {
              padding: 10,
              margin: 10,
              width: 150,
              marginBottom: 10,
              "alignSelf": "stretch",
              "flexDirection": "row",
              "justifyContent": "center",
              "alignItems": "center",
              backgroundColor: "#444"
            }, underlayColor: 'rgba(224,224,224,1)', onPress: () => {
              if (this.props.onChange) {
                this.props.onChange("", null, 0);
              }
              this.props.activity.setState({ open: false });
            } },
          React.createElement(
            Text,
            { style: { color: "#fff" } },
            "CLEAR"
          )
        ) : null,
        React.createElement(
          TouchableHighlight,
          { style: {
              padding: 10,
              margin: 10,
              width: 150,
              marginBottom: 10,
              "alignSelf": "stretch",
              "flexDirection": "row",
              "justifyContent": "center",
              "alignItems": "center",
              backgroundColor: "#444"
            }, underlayColor: 'rgba(224,224,224,1)', onPress: () => {
              this.props.activity.setState({ open: false });
            } },
          React.createElement(
            Text,
            { style: { color: "#fff" } },
            "OK"
          )
        )
      )
    );
  }

}

// <TouchableHighlight style={{
//     padding:10,
//     margin:10,
//     marginBottom:10,
//     "alignSelf": "stretch",
//     "flexDirection": "row",
//     "justifyContent": "center",
//     "alignItems": "center",
//     backgroundColor: "#cccccc"
//   }}   underlayColor = 'rgba(224,224,224,1)'  onPress={() =>{
//     this.props.activity.setState({open:false});
//   }}>
//   <Text>
//     {"OK"}
//   </Text>
// </TouchableHighlight>
var styles = StyleSheet.create({
  "listview_1": {
    "alignSelf": "stretch",
    "flex": 0.9,
    "marginLeft": 0,
    "marginTop": 0
  },
  "cell": {
    padding: 15,
    "alignSelf": "stretch",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "ok": {
    padding: 10,
    margin: 10,
    marginBottom: 10,
    "alignSelf": "stretch",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    backgroundColor: "#cccccc"

  },

  "label": {
    "fontSize": 15,
    "color": "rgba(0,0,0,1)",
    "marginLeft": 0,
    "marginTop": 0
  },

  modal2: {
    height: 300,
    backgroundColor: "#f2f2f2"
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  }

});