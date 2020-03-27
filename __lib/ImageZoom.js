
import React, { Component } from 'react';
import { Image, View, Platform, Dimensions, TouchableOpacity } from 'react-native';
import ApiUteis from "../api/uteis";
import ImageZoom from 'react-native-photo-view';

export default class ApiImageZoom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXM' + 'AAABIAAAASABGyWs+AAAACXZwQWcAAAAYAAAAGAB4TKWmAAAAUElEQVRIx2NgGAVDCvz//z/q////tbQ0/M9/CHCgpeENo4YPL8NJBujmMVHVdWT6on7' + 'UkpFpiQOx+liIVcjIyLgMmsxVGBkZD9DEF6OAJgAAorj7ZBCISyAAAAAASUVORK5CYII=';
  }
  componentDidMount() {}

  render() {

    var source = this.props.source;
    if (!this.props.source) {
      source = {};
    }
    console.log(source);
    var style = {};
    style.width = Dimensions.get('window').width;
    style.height = Dimensions.get('window').height;

    return (//resizeMode = {this.props.resizeMode}
      React.createElement(
        View,
        { style: { "alignSelf": "stretch", "flex": 1, backgroundColor: "#000" } },
        React.createElement(ImageZoom, { resizeMode: Image.resizeMode.contain,
          source: source,
          minimumZoomScale: 0.5,
          maximumZoomScale: 3,
          androidScaleType: 'fitCenter',
          onLoad: () => console.log("Image loaded!"),
          style: style }),
        React.createElement(
          TouchableOpacity,
          { style: {
              "position": "absolute",
              "borderRadius": 5,
              "flexDirection": "column",
              "alignItems": "center",
              "justifyContent": "center",
              "backgroundColor": "rgba(0,0,0,0.5)",
              "width": 50,
              "height": 50,
              "left": 5,
              "top": 10
            },
            underlayColor: 'rgba(220,220,220,1)',
            onPress: () => {
              if (this.props.activity) {
                this.props.activity.setState({ open: false });
              }
            } },
          React.createElement(Image, { style: {
              "width": 30,
              "height": 30,
              "marginLeft": 0,
              "marginTop": 0
            },
            resizeMode: Image.resizeMode.cover, source: { uri: this.base64Icon, scale: 1 } })
        )
      )
    );
  }
}