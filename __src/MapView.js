import React, { Component } from 'react';
import {  View,StyleSheet,Image,Text,TouchableOpacity ,Platform} from 'react-native';
import MapView from "react-native-maps";

export default  class ApiMapView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: props.latitude ? props.latitude : 0.0,
      longitude :  props.longitude ?  props.longitude : 0.0  ,
      altitude :  props.altitude ?  props.altitude : 12
    };
  }

 
  local(){
    var fator =  this.state.altitude*this.state.altitude*(this.state.altitude/2);
    return {
      latitude: Number(this.state.latitude) ,
      longitude: Number(this.state.longitude),
      latitudeDelta:120/(this.state.altitude*fator),/// 0.122,
      longitudeDelta:100/(this.state.altitude*fator)// 0.121
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps!= this.props){
      nextState.altitude = nextProps.altitude?nextProps.altitude:12;
      nextState.latitude = nextProps.latitude?nextProps.latitude:0.0;
      nextState.longitude = nextProps.longitude? nextProps.longitude:0.0;
      nextState.dataSource = nextProps.dataSource;
     return true;
    }
    return false;
  }

  render() {
 
    return (
      <MapView
        showsUserLocation={true}
       {...this.props}
        region={this.props.region ? this.props.region() :  this.local()}
        initialRegion={this.props.region ? this.props.region() :  this.local()}    >
        {this.getViews()}
      </MapView>
    );
  }

  getViews(){
        if(this.props.children){
        return this.props.children;
      }else{
        return (
          <MapView.Marker   ref={(v)=>this["cell_0"]=v}    
          coordinate={ this.props.region ? this.props.region() :  this.local() }    >
          </MapView.Marker>
        )
      }
    }

  }
