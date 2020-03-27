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
        customMapStyle={this.props.dark?dark:undefined}
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

  let dark=[
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#181818',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1b1b1b',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#2c2c2c',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8a8a8a',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#373737',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#3c3c3c',
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#4e4e4e',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#3d3d3d',
        },
      ],
    },
  ]
