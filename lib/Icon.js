import React, {
  Component
} from "react";
import {
  View,
  StyleSheet
} from "react-native";
import {
  createIconSet
} from "react-native-vector-icons";

import material_design_icons from "./icon_material_design_icons.js";
import material_icons from "./icon_material_icons.js";

export default class Icon extends Component {
  gerarIcom(icon,fromFontFamily){
    if (fromFontFamily == "Material Design Icons") {
      return createIconSet(
        {[icon]: parseInt(material_design_icons[icon], 16)},
        "Material Design Icons",
        "materialdesignicons-webfont.ttf"
      );
    }else {
      return createIconSet(
        {[icon]: parseInt(material_icons[icon], 16)},
        "Material Icons",
        "MaterialIcons.ttf"
      );
    }
  }
  render() {
    const {style,name,fromFontFamily}=this.props
    const {fontSize=20,color="#000000"}= StyleSheet.flatten(style);
    const MakeIcon=this.gerarIcom(name,fromFontFamily);
    return (
      <View style={[style,styles.box,{fontSize:null,color:null}]}>
        <MakeIcon
          {...this.props}
          ref={"icon"}
          name={name}
          size={fontSize}
          style={{ backgroundColor: "rgba(0,0,0,0)" }}
          color={color}
          />
      </View>
    );
  }
}
Icon.defaultProps={
  style:{
    fontSize: 20,
    color: "#000000"
  },
  name:"add",
  fromFontFamily:"Material Design Icons"
}
let styles =StyleSheet.create({
  box: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0)"
  },
});
