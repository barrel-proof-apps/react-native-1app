'use strict';
import React, { Component } from 'react';

import  {
  StyleSheet,
  View,Switch,Text,
  ActivityIndicator,
} from 'react-native';

function NewSwitch(props){
  if(props.label){
    return(
      <SwitchLabel {...props} onValueChange={onChange(props)}/>
    )
  }else {
    return(
      <Switch {...props} onValueChange={onChange(props)}/>
    )
  }
}

const SwitchLabel=(props)=>(
  <View style={[styles.body,props.style]}>
    <Text style={styles.label} >
      {props.label}
    </Text>
    <Switch  {...props}  />
  </View>
)

const onChange=(props)=>(value)=>{
  if(props.onChange){
    props.onChange(value);
  }
}
export default NewSwitch;

var styles = StyleSheet.create({
  body:{
    flex:1,
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center"
  },
  label:{
    fontSize:11,
    padding:0,
    margin:0,
    marginBottom:3,
    color:"#999"
  }
});
