'use strict';
import React, { Component } from 'react';

import  {
  StyleSheet,
  View,Platform,
  ActivityIndicator,
} from 'react-native';


export default  class Progresso extends Component {
    render() {
    let {style}=this.props;
    style=StyleSheet.flatten(style);

    var size = 0;
    if(Platform.OS !== 'android' ){
      size =  style.height?style.height:50;
      if(size>50){
        size = "large";
      }else{
        size = "small";
      }
    }else{
      size =  style.height?style.height:50;
    }

    return (
      <View   style={styles.body} >
        <ActivityIndicator
          color={style.color}
          style={{ backgroundColor:"rgba(0,0,0,0)"}}
          size={size}
          />
      </View>
    );
  }
}

Progresso.defaultProps={
  style:{}
}

var styles = StyleSheet.create({
  body:{
      backgroundColor:"rgba(0,0,0,0)",
      "flexDirection": "column",
      "alignItems": "center",
      "justifyContent": "center",
      minHeight:30 ,
      minWidth:30
    }
});
