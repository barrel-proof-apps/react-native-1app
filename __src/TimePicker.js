'use strict';
import React, { Component } from 'react';
import Icon from './Icon';
import  {
  StyleSheet,
  View,Switch,
  ActivityIndicator,TouchableOpacity,Text
} from 'react-native';

// var pt =require('moment/locale/pt-br');
var moment = require("moment");
// moment.locale('pt-br');

import DateTimePicker from 'react-native-modal-datetime-picker'

export default  class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value  };
    if(this.state.value){
      this.state.date = this.getDate(  this.state.value ) ;
    }
    this.state.br = this.getDateBr(this.state.date);
  }
  getDate(value){
    if(this.props.time == "timeOnly"){
      return   new Date( moment( moment().format("DD/MM/YYYY")+" "+(value?value:"00:00"), "DD/MM/YYYY HH:mm").toJSON() );
    }else{
      return  new Date(value);
    }
  }
  getDateBr(date){
    if(!date){
      return "";
    }
    var br =  moment(date ).format("HH:mm");;

    // alert(br)
    return br;
  }

  showDateTimePicker () {
    this.setState({ isDateTimePickerVisible: true })
  }

  hideDateTimePicker () {
    this.setState({ isDateTimePickerVisible: false })
  }

  handleDatePicked(date){
    // alert(date)
    var value =  moment(date).toJSON();
    var br = this.getDateBr(date);
    //
    try {
      if(this.props.time == "timeOnly"){
        value = br;
      }
      this.setState({value: value , isDateTimePickerVisible: false,br:br});

      if(this.props.onChange){
        this.props.onChange( value ,br)
      }
      if(this.props.onChangeText){
        this.props.onChange(value ,br)
      }
    } catch (e) {
      console.log(e);
      alert(e)
    }


    // this._hideDateTimePicker()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps!= this.props){
      nextState.value = nextProps.value;
      if(nextState.value){
        nextState.date =  this.getDate(nextState.value ) ;
      }else{
        nextState.date = null;
      }
      nextState.br = this.getDateBr(  nextState.date);
    }
    return true;
  }

  render() {
    var style =  {

      flex:1,
      alignSelf:"stretch",
      borderBottomColor :"#777",
      borderTopWidth :0,
      borderLeftWidth :0,
      borderRightWidth :0,
      borderBottomWidth :1,
      borderStyle :"solid"
    };

    if(this.props.style){
      var lista = [];
      if( Array === this.props.style.constructor){
        lista = this.props.style;
      }else{
        lista.push(this.props.style);
      }
      for (var a = 0; a < lista.length; a++) {
        var st = lista[a];
        if( (typeof st === "object") && (st !== null) ){
          //nada
        }else if(st){
          st = StyleSheet.flatten(this.props.style);
        }else if(!st){
          continue;
        }
        var tags = Object.keys(st);
        for (var i = 0; i < tags.length; i++) {
          style[tags[i]] = st[tags[i]];
        }
      }
    }
    var color = style.color?style.color:"#000";
    delete style.color;
    // this.state.br = this.getDateBr(  this.state.date);
    // console.log(this.state);
    if(this.props.decorationColor){
      style.borderBottomColor = this.props.decorationColor;
    }
    if(this.props.display){
      this.state.br = this.props.display;
    }
    return (
      <View style={[style,{flexDirection:"row"}]}>
        <TouchableOpacity onPress={()=>{
            this.showDateTimePicker()
          }} style={{
            padding:5,
            paddingTop:10,
            paddingLeft:0,
            minHeight:55,
            flexDirection:"column",
            flex:1,
            alignSelf:"stretch",
            // backgroundColor:"#ccc"
          }}>
          {this.props.label ?(
            <Text style={[{
                fontSize:11,
                padding:0,
                margin:0,
                marginBottom:3,
                color: style.borderBottomColor
              }  ]} >
              {this.props.label}
            </Text>
          ):null}

          <Text style={{color:color,fontSize:style.fontSize?style.fontSize:15,marginTop:4}} >{this.state.br?this.state.br:"-"}</Text>
        </TouchableOpacity>

        {!this.props.disabledClear?(

          <TouchableOpacity style={ {
              "alignSelf": "stretch",
              "justifyContent": "center",
              "alignItems": "center",
              marginBottom:-10,
              "height": 50,
              "width": 50,
            } } onPress={ () => {
              this.setState({value: "" , isDateTimePickerVisible: false,br:""});
              try {
                if(this.props.onChange){
                  this.props.onChange( "" ,"")
                }
                if(this.props.onChangeText){
                  this.props.onChange("" ,"")
                }
              } catch (e) {
                console.log(e);
              }
            } }>
            <Icon style={ {
                "fontSize": 20,
                "color": "#000"
              } } fromFontFamily={ "Material Design Icons" } icon={ "close" } />
            </TouchableOpacity>
          ):null}

          <DateTimePicker
            date={this.state.date?this.state.date:new Date()}
            is24Hour={true}
            mode={ "time"  }
            datePickerModeAndroid={this.props.datePickerModeAndroid?this.props.datePickerModeAndroid:"calendar"}
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={(date)=>{
              this.handleDatePicked(date);
            }}
            onCancel={()=>{
              this.hideDateTimePicker();
            }}
            />
        </View>
      );
    }
  }
