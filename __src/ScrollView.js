'use strict';
import React, { Component } from 'react';

import  {
  View,
  Animated,
  StyleSheet,
  ScrollView,
} from 'react-native';


export default  class ApiScrollView extends Component {
  constructor(props) {
    super(props);
    this.state = {  opacity:0,y:0 };
    this.y = 0 ;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      //{onUpdate}
    }
    return true;
  }
  onScroll(e){
    var y = e.nativeEvent.contentOffset.y;
    this.y = y;
    this.setState({opacity:this.calcOpacity(),y:y});
    // if (e.nativeEvent.contentOffset.y >= 50) {
    //   // onChangeHeaderVisibility(false);
    // } else {
    //   // onChangeHeaderVisibility(true);
    // }
  }
  componentDidMount() {
    // console.log("ok");
    // console.log(this.refs.myScrollView);
    // console.log(this.refs.myScrollView.scrollTo());

    //{onDidMount}
  }

  calcOpacity(){
    this.state.opacity = 0 ;
    if( this.y <= 25){
      this.state.opacity = 0 ;
    }if(this.y>=125){
      this.state.opacity = 1 ;
    }else{
      this.state.opacity = ((this.y-25)*1)/100 * 1;
      if(this.state.opacity>1){
        this.state.opacity = 1 ;
      }
    }
    return this.state.opacity;
  }
  scrollTo({x, y, animated}){
    this.refs.myScrollView.scrollTo({x, y, animated});
  }
  render() {
    if(!this.props.fadeTitle){
      return (
        <ScrollView ref='myScrollView' automaticallyAdjustContentInsets={false} {...this.props} >
          {this.props.children}
        </ScrollView>
      );
    }
    var child= [];
    if(this.props.children){
      for (var i = 0; i < this.props.children.length; i++) {
        let view =  this.props.children[i];
        if(i==0){
          // console.log(view);
        }else{
          child.push(view);
        }
      }
    }
    // console.log(this.props);
    return (
      <Animated.View style={[this.props.style,styles.view,this.props.superStyle]}>
        <ScrollView ref='myScrollView' keyboardDismissMode={ this.props.keyboardDismissMode } bounces={false} horizontal={ this.props.horizontal }  onScroll={(e)=>{
            this.onScroll(e);
            if(this.props.onScroll){
              this.props.onScroll(e);
            }
          }} automaticallyAdjustContentInsets={false}   >
          {child}
        </ScrollView>
        {this.calcOpacity()>0?(
          <View style={[styles.bar,{opacity:this.calcOpacity()}]}>
            {this.props.children[0]}
          </View>
        ):null}

      </Animated.View>
    );
  }
}

var styles = StyleSheet.create(
  {
    scroll:{
      alignSelf:"stretch",
      flex:1
    },
    "view": {
      "flexDirection": "column",
    },
    "bar": {
      minHeight:55,
      // height:50,
      // width:300,
      "alignSelf": "stretch",
      "flexDirection": "column",
      "position": "absolute",
      "right": 0,
      "top": 0,
      "left": 0
    },

  });
