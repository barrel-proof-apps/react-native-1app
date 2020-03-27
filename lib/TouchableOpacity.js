'use strict';
import React, { Component } from 'react';

import  {
  StyleSheet,
  TouchableOpacity
} from 'react-native';


export default function EdiTouchableOpacity(props) {
    return (
      <TouchableOpacity
        {...props}
        style={[styles.view,isElevation(props.elevation),props.style]}/>
    );
  }

function isElevation(elevation){
    if (elevation) {
      return Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: (0.5/elevation),
          shadowRadius: (2/elevation),
          // shadowOffset: {
          //   height: 1,
          //   width: 0
          // }
        },
        android: {
          elevation: (5/elevation),
        }
      });
    }
    return null;
  }

let styles = StyleSheet.create({
  view:{}
})
EdiTouchableOpacity.defaultProps={
  onPress:()=>console.log("NOT onPress"),
  style:{},
  disabled:false,
  elevation:null
}
