import React from "react";
import { StyleSheet, Text, ScrollView,Dimensions } from "react-native";
import TextInput from "./TextInput";

import { View, TouchableOpacity } from "react-native";
let height =Dimensions.get('window').height;

import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation
} from "react-native-popup-dialog";

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
      this.setState(
        {
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
          dialogStyle,
          visible:true
        }
      );
      // this.scaleAnimationDialog.show();
    };
  }

  closeDialog() {
    // this.scaleAnimationDialog.dismiss();
    this.setState({ input: null,body:[],visible:false });
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
    return (
      <PopupDialog
        ref={popupDialog => {
          this.scaleAnimationDialog = popupDialog;
        }}
        visible={this.state.visible}
        dialogAnimation={slideAnimation}
        width={0.91}
        height={0.8}
        useNativeDriver
        // onHardwareBackPress={()=>this.closeDialog()}
        containerStyle={[styles.zindex,containerStyle, styles[align]]}
        // dismissOnTouchOutside={false}
        dialogStyle={[styles.dialogStyle, dialogStyle]}
        dialogTitle={
          (title && <DialogTitle style={styles.title} title={title} />) || renderHead || <View />
        }
        actions={
          <View style={styles.actionButton}>
            {actions.map((prop, index) => (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (prop.onPress) prop.onPress();
                  this.closeDialog();
                }}
                key={"button" + index}
              >
                <View style={styles.borderB} />
                <Text style={[styles.textButton, styleTextButton]}>
                  {prop.title}
                </Text>
                <View style={styles.borderB} />
              </TouchableOpacity>
            ))}
          </View>
        }
      >
        <ScrollView style={styles.scroll}>
          <Text style={[styles.text, styleDescricao]}>{descricao}</Text>
          {body}
        </ScrollView>
        {input && <View style={styles.viewInput} />}
        {input && (
          <TextInput
            {...input}
            style={[styles.textinput, input.style]}
            value={this.state.texto}
            onChange={texto => {
              if (input.onChange) input.onChange(texto);
              this.setState({ texto });
            }}
            // autoFocus={true}
            onSubmitEditing={() => {
              if (input.onSubmitEditing) {
                input.onSubmitEditing();
                this.closeDialog();
              }
            }}
          />
        )}
      </PopupDialog>
    );
  }
}
var styles = StyleSheet.create({
  top: {
    paddingTop: 50,
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
  zindex:{
    zIndex:5000
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
    maxHeight: (height-200),
    flexDirection: "column"
  },
  actionButton: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch",
    flex:1
  },
  dialogStyle: {
    height: null,
    minHeight: 200,
    backgroundColor: "rgba(248,255,248,0.96)"
  },
  title:{
    backgroundColor: "rgba(248,255,248,0.3)"
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
