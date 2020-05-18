import React from "react";
import {
  View,
  Platform,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView
} from "react-native";
import Rgba from "rgba-convert";
// import SafeAreaView from 'react-native-safe-area-view';

function getStyle(backgroundColor) {
  var cor = Rgba.obj(backgroundColor ? backgroundColor : "#000");
  if (cor.r > 125 && cor.g > 125 && cor.b > 125) {
    return "dark-content";
  } else {
    return "light-content";
  }
}

const Bar=(props)=> {
  let style=StyleSheet.flatten(props.style);
  let shadow=props.removeShadow?{}:styles.shadow;
  let height=styles.SafeAreaView.height+(style.height||0);
  let backgroundColor=style.backgroundColor;
  let translucent=Platform.OS == "android" && Platform.Version >= 21;
  return (
    <SafeAreaView style={[styles.SafeAreaView,shadow,style,{height,backgroundColor}]} forceInset={{ top: 'always',bottom:'never' }}>
      <StatusBar
        backgroundColor={translucent ? "rgba(0,0,0,0)" : backgroundColor}
        translucent={translucent}
        barStyle={getStyle(backgroundColor)}
        />

      <View style={[styles.box,style]}>
        {props.children}
      </View>
    </SafeAreaView>
  );
}
export default Bar;
let styles=StyleSheet.create({
  SafeAreaView:{
    alignSelf:"stretch",
    height :  StatusBar.currentHeight||0,
    paddingTop : StatusBar.currentHeight||0,
    zIndex:100
  },
  shadow:{
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.5 ,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  box:{
    alignSelf: "stretch",
    flex: 1,
    height: 50,
    padding: 0,
    paddingTop: 0,
    backgroundColor: "rgba(0,0,0,0)"
  }
})
