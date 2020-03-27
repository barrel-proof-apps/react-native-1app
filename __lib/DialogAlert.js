var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import TextInput from "./TextInput";

import { View, TouchableOpacity } from "react-native";

import PopupDialog, { DialogTitle, DialogButton, SlideAnimation, ScaleAnimation, FadeAnimation } from "react-native-popup-dialog";

const fadeAnimation = new FadeAnimation({ animationDuration: 150 });
const scaleAnimation = new ScaleAnimation();
const slideAnimation = new SlideAnimation({ slideFrom: "bottom" });

let _ref = null;

export default class DialogAlert extends React.Component {
  constructor(props) {
    super(props);
    _ref = this;
    this.state = {
      title: "",
      descricao: "",
      actions: [],
      body: [],
      styleDescricao: {},
      styleTitle: {},
      action: [],
      renderHead: null,
      styleTextButton: {},
      texto: "",
      input: null,
      dialogStyle: {},
      center: "center",
      containerStyle: {}
    };
    this.showScaleAnimationDialog = ({
      title = "",
      descricao = "",
      actions = [],
      body = [],
      align = "center",
      styleDescricao = {},
      styleTitle = {},
      action = [],
      renderHead = null,
      styleTextButton = {},
      texto = "",
      input = null,
      dialogStyle = {},
      containerStyle = {}
    }) => {
      // console.log(actions);
      this.setState({
        title,
        descricao,
        actions,
        body,
        align,
        styleDescricao,
        styleTitle,
        action,
        containerStyle,
        renderHead,
        texto,
        input,
        dialogStyle
      }, () => this.scaleAnimationDialog.show());
      // this.scaleAnimationDialog.show();
    };
  }

  closeDialog() {
    this.scaleAnimationDialog.dismiss();
    this.setState({ input: null });
  }
  render() {
    const {
      title,
      descricao,
      actions,
      body,
      styleDescricao,
      styleTitle,
      action,
      renderHead,
      styleTextButton,
      input,
      dialogStyle,
      align,
      containerStyle
    } = this.state;
    return React.createElement(
      PopupDialog,
      {
        ref: popupDialog => {
          this.scaleAnimationDialog = popupDialog;
        },
        dialogAnimation: slideAnimation,
        width: 0.91,
        height: 0.8,
        containerStyle: [containerStyle, styles[align]],
        dismissOnTouchOutside: false,
        dialogStyle: [styles.dialogStyle, dialogStyle],
        dialogTitle: title && React.createElement(DialogTitle, { title: title }) || renderHead || React.createElement(View, null),
        actions: React.createElement(
          View,
          { style: styles.actionButton },
          actions.map((prop, index) => React.createElement(
            TouchableOpacity,
            {
              style: styles.button,
              onPress: () => {
                if (prop.onPress) prop.onPress();
                this.closeDialog();
              },
              key: "button" + index
            },
            React.createElement(View, { style: styles.borderB }),
            React.createElement(
              Text,
              { style: [styles.textButton, styleTextButton] },
              prop.title
            ),
            React.createElement(View, { style: styles.borderB })
          ))
        )
      },
      React.createElement(
        ScrollView,
        { style: styles.scroll },
        React.createElement(
          Text,
          { style: [styles.text, styleDescricao] },
          descricao
        ),
        body
      ),
      input && React.createElement(View, { style: styles.viewInput }),
      input && React.createElement(TextInput, _extends({}, input, {
        style: [styles.textinput, input.style],
        value: this.state.texto,
        onChange: texto => {
          if (input.onChange) input.onChange(texto);
          this.setState({ texto });
        }
        // autoFocus={true}
        , onSubmitEditing: () => {
          if (input.onSubmitEditing) {
            input.onSubmitEditing();
            this.closeDialog();
          }
        }
      }))
    );
  }
}
var styles = StyleSheet.create({
  top: {
    paddingTop: 90,
    justifyContent: "flex-start"
  },
  center: {},
  viewInput: {
    height: 1,
    backgroundColor: "rgba(187,177,177,0.53)",
    alignSelf: "stretch"
  },
  text: {
    textAlign: "center",
    alignSelf: "stretch",
    color: "rgba(55,55,55,1)",
    alignSelf: "auto",
    fontWeight: "normal",
    fontSize: 14,
    margin: 20
  },
  textinput: {
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    textAlign: "left",
    fontWeight: "normal",
    borderStyle: "solid",
    borderWidth: 0,
    borderTopWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    borderColor: "rgba(187,177,177,0.53)"
  },
  textContainer: {
    paddingHorizontal: 1,
    paddingVertical: 1,
    height: 40
  },
  button: {
    borderStyle: "solid",
    borderWidth: 0,
    borderTopWidth: 1,
    borderColor: "rgba(187,177,177,0.53)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
    height: 40,
    flexDirection: "row"
  },
  borderB: {
    width: 0.5,
    height: 25,
    backgroundColor: "rgba(187,177,177,0.53)"
  },
  textButton: {
    fontWeight: "400",
    fontSize: 18,
    flex: 1,
    flexWrap: "nowrap",
    textAlign: "center",
    color: "rgb(0, 85, 255)"
  },
  scroll: {
    alignSelf: "stretch",
    // flex: 1,
    maxHeight: 500,
    flexDirection: "column"
  },
  actionButton: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch"
  },
  dialogStyle: {
    height: null,
    minHeight: 200
  }
});
export function openDialog(...args) {
  // const ref = App.getDefault();
  if (_ref) {
    _ref.showScaleAnimationDialog(...args);
  }
}
export function closeDialog(...args) {
  // const ref = App.getDefault();
  if (_ref) {
    _ref.closeDialog(...args);
  }
}