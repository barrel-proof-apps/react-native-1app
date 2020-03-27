'use strict';
import React, { Component } from 'react';

import  {
  KeyboardAvoidingView,
  View,Platform
} from 'react-native';

 export default function Content(props){

    if(props.keyboard && Platform.OS == 'ios'){
      return (
        <KeyboardAvoidingView  {...props} behavior={props.behavior ?props.behavior: "padding"}  >
          {props.children}
        </KeyboardAvoidingView>
      );
    }

    return (
      <View {...props} >
        {props.children}
      </View>
    );
  }
