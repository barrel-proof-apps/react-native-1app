import React, {
  Component
} from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";
import {
  createIconSet
} from "react-native-vector-icons";

import material_design_icons from "./icon_material_design_icons.js";
import material_icons from "./icon_material_icons.js";

export default class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: props.name?props.name:props.icon
    };
    this.make(this.state);
    this.styles = StyleSheet.create(this.tratarStyle(props));
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      nextState.icon = nextProps.name?nextProps.name:nextProps.icon;
      this.styles = StyleSheet.create(this.tratarStyle(nextProps));
      this.make(nextState);
    }
    return true;
  }

  tratarStyle(props) {
    var style = {
      fontSize: 20,
      color: "#000000"
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
    this.fontSize = style.fontSize;
    this.color = style.color;

    delete style.fontSize;
    delete style.color;
    return {
      view: style,
      box: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0)"
      }
    };
  }

  make(state) {
    var Icons = material_icons;
    if (this.props.fromFontFamily == "Material Design Icons") {
      Icons = material_design_icons;
      var glyphMap = {
        [state.icon]: parseInt(Icons[state.icon], 16)
      };
      this.Icon = createIconSet(
        glyphMap,
        "Material Design Icons",
        "materialdesignicons-webfont.ttf"
      );
    } else {
      var glyphMap = {
        [state.icon]: parseInt(Icons[state.icon], 16)
      };
      this.Icon = createIconSet(
        glyphMap,
        "Material Icons",
        "MaterialIcons.ttf"
      );
    }

    //console.log(glyphMap);
  }
  setNativeProps(style) {
    this.refs.icon.setNativeProps(style);
  }

  render() {
    // console.log(style);
    return (
      <View style={[this.styles.view, this.styles.box]}>
        <this.Icon
          {...this.props}
          ref={"icon"}
          name={this.state.icon}
          size={this.props.size ? this.props.size : this.fontSize}
          style={{ backgroundColor: "rgba(0,0,0,0)" }}
          color={this.props.color ? this.props.color : this.color}
        />
      </View>
    );
  }
}