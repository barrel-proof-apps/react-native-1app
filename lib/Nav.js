'use strict';
import React from 'react';
import { StyleSheet,View,BackHandler,Animated,Dimensions,Easing,ScrollView,RefreshControl} from "react-native";
let easing= Easing.elastic(0.8)
let _ref=null;
let largura =Dimensions.get('window').width;
let duration= 300;

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    _ref=this;
    this.state = {};
    this.nav=[];
    BackHandler.addEventListener('hardwareBackPress', ()=>{
      if(!this.nav[0]){
        return false
      }else if(this.nav.length) {
        this.pop()
        return true;
      }
    });
  }

  setNav(){
    this.state["anime_"+this.nav.length]=new Animated.Value(largura);
    // this.state["anime2_"+this.nav.length]=new Animated.Value(-largura);
    this.setState({navegar:true})
    setTimeout( ()=> {
      Animated.timing(this.state["anime_"+this.nav.length],{toValue: 0,easing,duration}).start();
      // Animated.timing(this.state["anime2_"+this.nav.length],{toValue: 0,easing,duration: 200}).start();
    }, 5);
  }

  push=(component,props)=>{
    this.nav.push({Component:component,prop:props});
    this.setNav()
  }

  pop=()=>{
    if(!this.nav.length||this.valtar)return;
    this.valtar=true;
    Animated.timing(this.state["anime_"+this.nav.length],{toValue: largura,duration}).start();
    // Animated.timing(this.state["anime2_"+this.nav.length],{toValue: -largura,duration: 200}).start();
    setTimeout( ()=> {
      this.nav.pop()
      this.setState({navegar:true});
      setTimeout( ()=> {
        this.valtar=false;
      }, 50);
    }, duration);
  }
  navigate=(tag,props)=>{
    let {pgs={}}=this.props;
    let pg=pgs[tag]
    if(!pg)return;
    this.nav.push({Component:pg.screen,prop:props});
    this.setNav()
  }
  popToTop=()=>{
    this.nav=[]
    this.setState({navegar:true})
  }
  onViewLayout=(evt)=> {
    // var height = evt.nativeEvent.layout.height;
    // var width = evt.nativeEvent.layout.width;
    // this.height=height;
    // console.log(height);
  }
  render() {
    const{InitComponent,style,screenProps,propsInit}=this.props;
    return (
      <View   onLayout={this.onViewLayout}
        style={[styles.tela,style]} >
        <View style={styles.corpo}>
          <InitComponent
            {...propsInit}
            screenProps={screenProps}
            nav={{popToTop:this.popToTop,push:this.push,pop:this.pop,navigate:this.navigate,goBack:this.pop}}
            navigation={{popToTop:this.popToTop,push:this.push,pop:this.pop,navigate:this.navigate,goBack:this.pop}}
            />
        </View>
        {this.nav&&this.nav[0]&&this.nav.map(({Component,prop,anime},key)=>(
          <View style={[styles.corpo,{flexDirection: "row",width:largura,zIndex:key}]}>
            <Animated.View style={[styles.tela,{width:this.state["anime_"+(key+1)],backgroundColor: "rgba(22,22,22,0.1)"}]}/>
            <View style={[styles.tela,{width:largura}]}>
              <Component
                {...propsInit}
                {...prop}
                screenProps={screenProps}
                nav={{popToTop:this.popToTop,push:this.push,pop:this.pop,navigate:this.navigate,goBack:this.pop}}
                navigation={{popToTop:this.popToTop,push:this.push,pop:this.pop,navigate:this.navigate,goBack:this.pop}}
                />
            </View>
          </View>
        ))}
      </View>
    );
  }
}


var styles = StyleSheet.create(
  {
    "tela": {
      "flex": 1,
      "alignSelf": "stretch",
    },
    "corpo": {
      "flex": 1,
      "alignSelf": "stretch",
      position:"absolute",
      left:0,
      right:0,
      top:0,
      bottom:0,
    }
  }
);
