'use strict';

import React, { Component } from 'react';

import { StyleSheet, Platform, TextInput, View, Text } from 'react-native';

export default class ApiTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { mascara: null, text: "", isUpdatingMascara: false, limit: 0, height: 30 };
    if (props.defaultValue) {
      this.state.text = props.defaultValue;
    }
    if (props.value) {
      this.state.text = props.value;
    }
    if (props.mascara) {
      this.state.mascara = props.mascara;
    }
    if (props.mask) {
      this.state.mascara = props.mask;
      this.state.limit = props.mask.length;
    }

    if (props.limit) {
      this.state.limit = props.limit;
    }
    this.styles = this.tratarStyle(props); //
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      if (nextProps.value || nextProps.value + "" == "0") {
        nextState.text = nextProps.value + "";
      } else {
        nextState.text = "";
      }
      // this.styles = this.tratarStyle(nextProps) ;//
    }
    return true;
  }
  focus() {
    this.input.focus();
  }

  onSubmitEditing(onSubmitEditing) {
    this.onSubmitEditingFunction = onSubmitEditing;
  }
  onChange(onChange) {
    this.onChangeFunction = onChange;
  }

  getValue() {
    return this.state.text;
  }
  setValue(text) {
    if (!text) {
      text = "";
    }
    this.setState({ text: text });
    this.input.setNativeProps({
      text: text
    });
  }
  setMascara(value) {
    // this.state.mascara = value;
    this.setState({ mascara: value });
  }
  setLimit(limit) {
    this.state.limit = parseInt(limit + "");
    this.setState(this.state);
  }

  componentDidMount() {
    if (this.props.mascara) {
      this.state.mascara = this.props.mascara;
    }
  }
  mask(text) {
    // console.log(text);
    if (this.props.mask) {
      this.state.mascara = this.props.mask;
    }
    var mascara = this.state.mascara;

    this.state.text = text;
    // if (this.props.activity && this.props.tag) {
    //   this.props.activity.state[this.props.tag]= text;
    // }
    // console.log(this.state);
    if (!this.state.mascara || this.state.mascara == "") {
      return text;
    }
    var formattedString = text;
    var nova = text;
    if (mascara && formattedString) {
      for (var i = 0; i < mascara.length; i++) {
        var pos = mascara.charAt(i);
        // console.log(formattedString);
        if (formattedString.length > i) {
          var mas = formattedString.charAt(i);
          // console.log("mas:"+mas+" pos:"+pos+"  index:"+i);

          if (pos === mas || pos !== '-' && pos !== ' ' && pos !== '(' && pos !== ')' && pos !== '/' && pos !== '.' && pos !== ':') {
            // console.log("coninuou");
            continue;
          } else {
            var prefixo = formattedString.substring(0, i);
            var sufixo = formattedString.substring(i, formattedString.length);
            // console.log("mas:"+mas+" pos:"+pos+" p:"+prefixo+" s:"+sufixo+" index:"+i);
            formattedString = prefixo + pos + sufixo;
          }
        }
      }
    }
    var limit = this.state.limit;
    if (formattedString.length > limit && limit > 0) {
      formattedString = formattedString.substring(0, limit);
    }
    this.state.text = formattedString;
    // this.setState(this.state);
    // this.input.setNativeProps({
    //   text: formattedString
    // });
    return formattedString;
  }

  limparNumero(string) {
    try {
      string = string + "";
      // console.log(string);"de33sl".replace(/[^,.,0-9]/g, '')
      var val = string.replace(',', '.');
      val = val.replace(/[^,-.,0-9]/g, '');
      return val;
    } catch (e) {
      // console.log(e);
      return "0";
    }
  }

  parse(text) {
    // console.log(text +" "+this.props.type);
    if (!text || text == "") {
      return "";
    }
    if (this.state.mascara || this.props.mask) {
      return text;
    }
    var type = "";
    if (this.props.keyboardType) {
      type = this.props.keyboardType;
    }
    if (this.props.type) {
      type = this.props.type;
    }
    if (type == "numero" || type == "numeric") {
      text = this.limparNumero(text);
    } else if (type == "integer") {
      text = ApiUteis.parseNumeroIntero(text);
    } else if (type == "money") {
      text = this.limparNumero(text);
    } else if (type == "float") {
      text = this.limparNumero(text);
    }
    // console.log(text);
    return text;
  }

  parseForce(text) {
    // console.log(text +" "+this.props.type);
    if (!text || text == "") {
      return "";
    }
    if (this.state.mascara || this.props.mask) {
      return text;
    }

    var type = "";
    if (this.props.keyboardType) {
      type = this.props.keyboardType;
    }
    if (this.props.type) {
      type = this.props.type;
    }
    if (type == "numero" || type == "numeric") {
      text = Number(text);
    } else if (type == "integer") {
      text = ApiUteis.parseNumeroIntero(text);
    } else if (type == "money") {
      text = Number(text);;
    } else if (type == "float") {
      text = Number(text);;
    }
    // console.log(text);
    return text;
  }

  render() {

    let keyboardType = "default";
    if (this.props.keyboardType) {
      keyboardType = this.props.keyboardType != "text" && this.props.keyboardType != "default" ? "numeric" : null;
    }
    let multiline = false;
    if (this.props.multiline) {
      multiline = this.props.multiline;
    }

    let numberOfLines = 1;
    if (this.props.numberOfLines) {
      numberOfLines = this.props.numberOfLines;
    }

    var placeholder = "";
    if (this.props.placeholder) {
      placeholder = this.props.placeholder;
    }

    if (this.props.keyboardType == "money" && this.state.text) {
      this.state.text = (this.state.text + "").replace(".", ",");
    }
    if (this.props.mask) {
      this.state.limit = this.props.mask.length;
    }
    if (this.props.disabled) {
      return React.createElement(
        View,
        { style: [this.styles.view, this.styles.boxDisable] },
        this.props.label ? React.createElement(
          Text,
          { style: this.styles.label },
          this.props.label
        ) : null,
        React.createElement(
          Text,
          { style: [this.styles.text, this.styles.styleInput] },
          this.state.text
        )
      );
    }
    // {
    //     borderBottomColor :"#ccc",
    //     borderTopWidth :0,
    //     borderLeftWidth:0,
    //     borderRightWidth:0,
    //     borderBottomWidth :1,
    //     borderStyle :"solid",
    //     margin:0,padding:0,
    //     marginBottom:2,
    //     // backgroundColor:"#000",
    //   }
    // console.log(this.state);
    return React.createElement(
      View,
      { style: [this.styles.view, this.styles.box] },
      this.props.label ? React.createElement(
        Text,
        { style: [this.styles.label, { backgroundColor: "rgba(0,0,0,0)" }] },
        this.props.label
      ) : null,
      React.createElement(TextInput, { placeholder: this.props.placeholder, onFocus: this.props.onFocus, secureTextEntry: this.props.secureTextEntry,
        underlineColorAndroid: "rgba(0,0,0,0)",
        multiline: multiline, numberOfLines: numberOfLines,
        autoCorrect: false,
        onEndEditing: () => {},
        style: [this.styles.styleInput, { height: Math.max(30, this.state.height) }],
        onChange: event => {
          try {
            if (event.nativeEvent && event.nativeEvent.contentSize) {
              var h = event.nativeEvent.contentSize.height + 2;
              if (h < 30) {
                h = 30;
              }
              this.setState({ height: h });
            }
          } catch (e) {}
          //console.log( event.nativeEvent.contentSize);
        },
        onContentSizeChange: event => {
          var h = event.nativeEvent.contentSize.height + 2;
          if (h < 30) {
            h = 30;
          }
          this.setState({ height: h });
        },
        autoCapitalize: "sentences",
        keyboardType: keyboardType, disabled: true,
        onBlur: () => {
          {
            var text = this.state.text;
            if (this.state.text != "") {
              text = this.mask(this.state.text);
              if (text.length > this.state.limit && this.state.limit > 0) {
                text = text.substring(0, this.state.limit);
              }
              text = this.parse(text);
            }

            if (this.props.onChange) {
              this.props.onChange(text);
            }
            if (this.onChangeFunction) {
              this.onChangeFunction(text);
            }
            if (this.onBlur) {
              this.onBlur(text);
            }
          }
        },
        onSubmitEditing: () => {
          var text = this.state.text;
          if (this.state.text != "") {

            text = this.mask(this.state.text);
            if (text.length > this.state.limit && this.state.limit > 0) {
              text = text.substring(0, this.state.limit);
            }
            text = this.parse(text);
          }

          if (this.props.onChange) {
            this.props.onChange(text);
          }
          if (this.onChangeFunction) {
            this.onChangeFunction(text);
          }

          if (this.props.onSubmitEditing) {
            this.props.onSubmitEditing();
          }
          if (this.onSubmitEditingFunction) {
            this.onSubmitEditingFunction();
          }
        },
        value: this.state.text ? this.state.text + "" : "",
        autoFocus: false,
        placeholderTextColor: "#777777",

        onChangeText: text => {

          if (text != "") {
            text = this.parse(text);
            text = this.mask(text);
            if (this.props.keyboardType && this.props.keyboardType != "text") {
              if (text.length > this.state.limit && this.state.limit > 0) {
                text = text.substring(0, this.state.limit);
              }
            }
            if (text.length > this.state.limit && this.state.limit > 0) {
              text = text.substring(0, this.state.limit);
            }
          }

          this.setState({ text: text });
          if (this.props.onChangeText) {
            this.props.onChangeText(text);
          }
          if (this.props.onChange) {
            this.props.onChange(text);
          }
          if (this.onChangeFunction) {
            this.onChangeFunction(text);
          }
        }, ref: input => this.input = input

      })
    );
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

    var textColor = "#000000";
    var fontSize = 14;
    var textAlign = "left";
    if (style.fontSize) {
      fontSize = style.fontSize;
    }
    if (style.textAlign) {
      textAlign = style.textAlign;
    }

    if (this.props.textColor) {
      textColor = this.props.textColor;
    } else if (style.color) {
      textColor = style.color;
      delete style.color;
    }

    var styleLabel = {};
    if (this.props.styleLabel) {
      styleLabel = this.props.styleLabel;
    }
    var styleInput = {
      // flex:1,
      "alignSelf": "stretch",
      color: textColor,
      textAlign: textAlign,
      fontSize: fontSize,
      // padding:0,
      // paddingLeft:5,
      paddingBottom: 3,
      marginLeft: -3,
      marginBottom: 0,
      paddingTop: 0,
      // borderWidth :0,
      // borderColor :"rgba(0,0,0,1)",
      // borderStyle :"solid",
      minHeight: 30,
      backgroundColor: "rgba(0,0,0,0)"
    };

    //secureTextEntry={this.props.secureTextEntry}  keyboardType={this.props.keyboardType}

    if (Platform.OS === 'android') {
      styleInput.marginBottom = -5;
    } else {
      styleInput.marginLeft = 0;
      styleInput.paddingBottom = 0;
    }
    style.paddingTop = 5;
    style.borderBottomColor = "#ccc";
    style.borderTopWidth = 0;
    style.borderLeftWidth = 0;
    style.borderRightWidth = 0;
    style.borderBottomWidth = 1;
    style.borderStyle = "solid";

    var textColor = style.color;
    var text = { color: textColor, marginLeft: 0 };
    delete style.height;
    delete style.color;
    delete style.fontSize;
    delete style.fontFamily;
    delete style.textAlign;

    return StyleSheet.create({
      text: text,
      view: style,
      styleInput: styleInput,
      label: { fontSize: 11, padding: 0, margin: 0, marginBottom: 0, color: "#999", textAlign: textAlign },
      box: { flexDirection: "column", paddingTop: 0, paddingBottom: 0 },
      boxDisable: { padding: 5, flexDirection: "column" }
    });
  }

}