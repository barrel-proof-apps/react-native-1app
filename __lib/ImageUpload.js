import React, { Component } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity, StyleSheet, Platform } from "react-native";
// var ImagePickerManager = require('NativeModules').ImagePickerManager;
import Icon from "./Icon";
import Image from "./Image";

var ImagePicker = require("react-native-image-picker");

var host = "http://192.168.1.104:7000";
var token_api = "";

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { load: false, value: props.value };
  }

  componentDidMount() {}
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      nextState.value = nextProps.value;
    }
    return true;
  }

  render() {
    var style = {};

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
    var styleImage = {};
    if (style.height) {
      styleImage.height = style.height;
    }
    if (style.width) {
      styleImage.width = style.width;
    }
    if (style.borderRadius) {
      styleImage.borderRadius = style.borderRadius;
    }
    // alert(JSON.stringify(this.state))
    if (this.props.disabled) {
      return React.createElement(Image, {
        style: style,
        resizeMode: this.props.resizeMode,
        source: { uri: this.state.value }
      });
    }
    return React.createElement(
      TouchableOpacity,
      {
        style: [style, { justifyContent: "center", alignItems: "center" }],
        disabled: this.state.load ? true : false,
        onPress: () => {
          this.upLoad(url => {
            this.setState({ load: false, value: url });
            if (this.props.onChange) {
              this.props.onChange(url);
            }
          });
        }
      },
      this.state.load ? React.createElement(ActivityIndicator, {
        style: [{ height: 80, backgroundColor: "rgba(0,0,0,0)" }],
        size: "large"
      }) : React.createElement(
        View,
        {
          style: [{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            alignSelf: "stretch"
          }, styleImage]
        },
        React.createElement(
          View,
          {
            style: {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "absolute"
            }
          },
          React.createElement(Image, {
            style: [{ flex: 1, alignSelf: "stretch" }, styleImage],
            resizeMode: this.props.resizeMode,
            source: { uri: this.state.value }
          })
        ),
        this.props.chidren ? this.props.chidren : React.createElement(
          View,
          {
            style: {
              justifyContent: "flex-end",
              alignItems: "center",
              padding: 10,
              flex: 1,
              alignSelf: "stretch"
            }
          },
          React.createElement(
            View,
            {
              style: {
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: 5,
                borderRadius: 5
              }
            },
            this.props.label ? React.createElement(
              Text,
              {
                style: {
                  shadowColor: "#000000",
                  shadowOpacity: 0.99,
                  shadowRadius: 5,
                  alignSelf: "stretch",
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: "800",
                  shadowOffset: {
                    height: 1,
                    width: 1
                  },
                  color: "#ffffff",
                  backgroundColor: "rgba(0,0,0,0)"
                }
              },
              this.props.label
            ) : null,
            React.createElement(
              Text,
              {
                style: {
                  textAlign: "center",
                  alignSelf: "stretch",
                  shadowColor: "#000000",
                  shadowOpacity: 0.99,
                  fontSize: 11,
                  shadowRadius: 5,
                  shadowOffset: {
                    height: 1,
                    width: 1
                  },
                  color: "#ffffff",
                  backgroundColor: "rgba(0,0,0,0)"
                }
              },
              this.state.value ? "alterar" : "adicionar"
            )
          )
        )
      )
    );
  }

  upLoad(retorno) {
    let bt_remover = true; //this.state.value ? true : false;
    this.pegarFoto(bt_remover, base64 => {
      var url = host + "/imageMake";

      console.log(url);
      if (!base64) {
        console.log("base64 null no salvarImagem");
        this.setState({ load: false });

        return;
      }
      this.setState({ load: true });

      var send = { data: base64, nome: "up.jpg" };
      // console.log(send);
      var config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(send)
      };
      if (token_api) {
        config.headers["x-request-id"] = token_api;
      }

      fetch(url, config).then(response => {
        // console.log(response);
        try {
          var json = response.json();
          return json;
        } catch (e) {
          console.log(e);
          return {};
        }
      }).then(result => {
        console.log(result);
        if (retorno) {
          retorno(result.url_img);
        }
      }).catch(error => {
        console.log(error);
      });
    });
  }

  pegarFoto(bt_remover, retorno) {
    var rem = {};
    if (bt_remover) {
      rem = { "Remover imagem": "remover" };
    }

    var options = {
      title: "Selecione uma imagem",
      videoQuality: "medium", // 'low', 'medium', or 'high'
      durationLimit: 30, // video recording max time in seconds
      maxWidth: this.props.maxWidth ? parseInt(this.props.maxWidth) : 500, // photos only
      maxHeight: this.props.maxHeight ? parseInt(this.props.maxHeight) : 750, // photos only
      // maxWidth:  500, // photos only
      // maxHeight:   750, // photos only
      quality: 1, // 0 to 1, photos only
      customButtons: [
        // {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      chooseFromLibraryButtonTitle: "Pegar no telefone",
      cancelButtonTitle: "Cancelar",
      takePhotoButtonTitle: "Tirar foto", // specify null or empty string to remove this button
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    // return ;
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);
      if (response.error) {
        console.log("ImagePickerManager Error: ", response.error);
        retorno(null);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        retorno(null);
      } else {
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        // var source;
        // if (Platform.OS === 'android') {
        //   source = {uri: response.uri, isStatic: true};
        // } else {
        //   source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // }
        //'data:image/jpeg;base64,'
        retorno(response.data);
      }
    });
  }
}

ImageUpload.setHost = function (url) {
  if (url) {
    host = url; //.replace("/v1","");
  }
};
ImageUpload.setToken = function (token) {
  token_api = token;
};