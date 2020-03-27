import { View } from 'react-native';
export default View;
// 'use strict';
// import React, { Component } from 'react';

// import  {
//   KeyboardAvoidingView,
//   StyleSheet,
//   View,Platform,
//   ActivityIndicator,
// } from 'react-native';

// var styles = StyleSheet.create({view:{}});
// export default  class EdiView extends Component {
//   constructor(props) {
//     super(props);
//     this.styles = StyleSheet.create({view:this.tratarStyle(props)})
//   }
//   shouldComponentUpdate(nextProps, nextState) {
//     if(nextProps!= this.props){
//        this.styles = StyleSheet.create({view:this.tratarStyle(nextProps)})
//     }
//     return true;
//   }

//   tratarStyle(props){
//     var style = {};

//     if(props.style){
//       var lista = [];
//       if( Array === props.style.constructor){
//         lista = props.style;
//       }else{
//         lista.push(props.style);
//       }
//       if(props.superStyle && typeof props.superStyle === "object"){
//         lista.push(props.superStyle);
//       }
//       for (var a = 0; a < lista.length; a++) {
//         var st = lista[a];
//         if( (typeof st === "object") && (st !== null) ){
//           //nada
//         }else if(st){
//           st = StyleSheet.flatten(props.style);
//         }else if(!st){
//           continue;
//         }
//         var tags = Object.keys(st);
//         for (var i = 0; i < tags.length; i++) {
//           style[tags[i]] = st[tags[i]];
//         }
//       }
//     }

//     if(props.elevation){
//       if(Platform.OS === 'android' ){
//         if(Platform.Version >= 21){
//           style.elevation =  Number(props.elevation);
//         }
//       }else{
//         style.shadowColor= "#000000";
//         style.shadowOpacity= 0.5;
//         style.shadowRadius= Number(props.elevation);
//         style.shadowOffset= {
//           height: 1,
//           width: 0
//         };
//       }
//     }
//     if(style.position=="fixed"){
//       style.position="absolute";
//     }
//     return style;
//   }


//   render() {

//     if(this.props.keyboard && Platform.OS == 'ios'){
//       return (
//         <KeyboardAvoidingView style={this.styles.view} behavior={"padding"}  >
//           {this.props.clild}
//           {this.props.children}
//         </KeyboardAvoidingView>
//       );
//     }

//     return (
//       <View style={this.styles.view}>
//         {this.props.clild}
//         {this.props.children}
//       </View>
//     );
//   }
// }
//