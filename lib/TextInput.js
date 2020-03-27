import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput as Input,
  Text
} from "react-native";
import { TextField } from "react-native-material-textfield-1app";
import VMasker from "vanilla-masker";

export default class TextInput extends Component {
  isFocused() {
    return this.input.isFocused();
  }

  focus() {
    return this.input.focus();
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
    let {value,style,color="#000",fontSize,autoCapitalize}=this.props;
    value=value?value+"":"";
    style={...StyleSheet.flatten(style)};
    color=style.color||color;
    fontSize=style.fontSize||fontSize;
    if (this.props.money && value) {
      value = this.props.money + " " + this.props.value;
    }
    if (this.props.inputNative) {
      if (this.props.errorText) {
        return (
          <View style={[style,{ padding: 0 }]}>
            <Input
              ref={v => (this.input = v)}
              selectionColor={color}
              placeholderTextColor={color}
              underlineColorAndroid={"rgba(0,0,0,0)"}
              {...this.props}
              fontSize={fontSize}
              onChangeText={text => {
                this.onChange(text);
              }}
              style={[styles.textinput, {}]}
              onChange={null}
              editable={!this.props.disabled}
              />
            <Text style={styles.text}>{this.props.errorText}</Text>
          </View>
        );
      }
      return (
        <Input
          ref={v => (this.input = v)}
          selectionColor={color}
          placeholderTextColor={color}
          underlineColorAndroid={"rgba(0,0,0,0)"}
          {...this.props}
          fontSize={fontSize}
          style={[style,{ padding: 0 }]}
          value={value}
          onChangeText={text => {
            this.onChange(text);
          }}
          onChange={null}
          editable={!this.props.disabled}
          />
      );
    }
    delete style.color;
    delete style.textAlign;
    delete style.fontWeight;

    return (
      <TextField
        ref={v => (this.input = v)}
        tintColor={color}
        baseColor={color}
        textColor={color}
        error={this.props.errorText}
        {...this.props}
        fontSize={fontSize}
        errorText={null}
        value={value}
        style={styles.box}
        containerStyle={[{ marginTop: -8 },style]}
        onChangeText={value => {
          this.onChange(value);
        }}
        onChange={null}
        />
    );
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
  },
  box: {
    alignSelf: "stretch",
    flex: 1
  }
});

TextInput.defaultProps={
  value:'',
  label:'-',
  onChange:()=>console.log("NOT onChange"),
  style:{},
  autoCapitalize:"sentences",
  autoCorrect:false,
  errorColor:"#777",
  fontSize:15
}
