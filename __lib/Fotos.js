import React, { Component } from 'react';
import { View, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import ViewPager from '../pageview/ViewPager';
// var EdiApi =  require('edi-api');
import ApiUteis from '../api/uteis.js';
import Image from './Image';

class ImageVideo extends Component {

  constructor(props) {
    super(props);
    this.state = { data: props.data };
    if (!this.state.data) {
      this.state.data = {};
    }
    this.base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QAA' + 'AAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAwAAAAMADO7oxXAAAC3ElEQVRo3u2ZzUtUURjGf68M4UdYu' + 'yJEojRaFApZUpEQBK7CaGUfi9oYuHLnPxG4NsiWRgt30cJFi4hIE60wKFtJlKFgH2NFlE+LuUPDnTvO/TjHCZpnee+c9/6e933vmX' + 'vOgbrq+r9lrgJJagC6gB7gELAP2BnczgPvgdfAM+CFmW3W2nwRvE/SHUlriq81Sbcl9dUSfEDSXALoSpqVdH47wfdLeuAAPKz7ktp9' + 'w1+QtO4Bvqh1SQO+4EckbXqEL2pT0ohr+NFtAA9r1BX8lW3KfFQlLlfjsyrwR4CnQLPTksbXN+C4mb1KbEBSDpgFumsEX9QC0GNmv6N' + 'uNmwxcPgfgCdgGE40QlKTpJWUvTvp4X34IKkpSQWuA3vSpMvMLgE3gB8Oq7AXuJakArNpU1USo1vSG4dVmIkLfzDLU0KxWuW2pQ7EaaF' + 'zrupuZl8ct1QZW5SBk64MlBi5FcRdyhjqVBwDh10bCEwsUFjs3M0Qpjqb0k+fZe/AFs8YkvQ9RfiVOME3fBsInpNmltoIx4lqocYMJY6' + 'toKVuJhxWxhZl4KtveEmNksaB8YRDy9hyET9aBXZ5hO8E7pHuO2s1fCGqAm89wg9S2FZJAx/JFmXgpQfwYstMAq0ZQpWxRRl46Bi+E3gCD' + 'DkIV51NUoukvItpVNKgpM9ZpuUS5SW1VK2AmW0AUxmz7qplSjUVsMUC6M2QqU5J846yXqrepFmcTvkgVy1TqulKnFst6rsoTHk5aqtfFBb1' + 'z6NuVlzUBwPGagwPMFYJHqrvC+0AHgEnagQ/A5wxs5+pDAQm2oDHgN+d43ItA6fN7F3mSJI6JC17eDkraVlSh9N0SGqXtLgN8IvydU4gqVn' + 'ShEf4CUn+92El9Utacgi+JKnfO3jIRE7SVWX7150PYqT+r3FyzCrpKHAROAsc4+/xalh5YI7CV+WUmWX+dHd2Thwy1EZhb3V3cOkT8NHJlFh' + 'XXW71B6r6aEqQ+pyPAAAAAElFTkSuQmCC';
  }

  componentDidMount() {
    ApiUteis.getYouTube(this.state.data.video, v => {
      this.state.data.url_video = v.url;
      if (v.image) {
        this.state.data.url_img = v.image;
      }
      this.setState({ data: this.state.data });
    });
  }

  render() {
    return React.createElement(
      View,
      { style: styles.page },
      React.createElement(
        TouchableOpacity,
        { style: styles.page, underlayColor: 'rgba(220,220,220,1)',
          onPress: () => {
            EdiApi.playVideo(this.state.data.url_video);
          } },
        React.createElement(
          Image,
          { source: { uri: this.state.data.url_img }, style: [styles.page, { flex: 1, justifyContent: 'center', alignItems: 'center' }] },
          React.createElement(Image, { style: { height: 50, resizeMode: 'contain', width: 50 }, source: { uri: this.base64Icon, scale: 1 } })
        )
      )
    );
  }
}

export default class Fotos extends Component {

  constructor(props) {
    super(props);
    this.state = { dataSource: new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1 !== p2 }), lista: [] };
    if (props.list) {
      var resultado = this.montarLista(props.list);
      this.state.lista = resultado;
      this.state.dataSource = this.state.dataSource.cloneWithPages(resultado);
    }
  }
  componentWillUnmount() {
    // console.log("delete componte FOTOS");
  }
  montarLista(lista, tag) {
    if (!lista) {
      return [];
    }
    this.state.lista = lista;
    var tag_foto = "url_img";
    var tag_video = "video";
    let resultado = [];
    if (lista) {
      for (var i = 0; i < lista.length; i++) {
        let item = lista[i];

        if (item[tag_foto] || item.url || item[tag_video]) {
          if (item.url) {
            item.url_img = item.url;
          }
          resultado.push(item);
        }
      }
    }
    return resultado;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      nextState.lista = this.montarLista(nextProps.list);
      // this.state.dataSource =this.state.dataSource.cloneWithPages(this.state.lista) ;
      nextState.dataSource = this.state.dataSource.cloneWithPages(nextState.lista);
    }
    return true;
  }

  _renderPage(data, pageID) {
    if (data.video) {
      return React.createElement(ImageVideo, { data: data });
    }
    return React.createElement(
      View,
      { style: styles.page },
      React.createElement(Image, { zoom: this.props.zoom, resizeMode: this.props.resizeMode, source: { uri: data.url_img },
        style: [styles.page, { overflow: "hidden" }] })
    );
  }

  render() {

    return React.createElement(
      View,
      { style: this.props.style },
      React.createElement(ViewPager, { style: styles.box, dataSource: this.state.dataSource, renderPage: (data, pageID) => {
          return this._renderPage(data, pageID);
        }, isLoop: false, autoPlay: false
      })
    );
  }
}

var styles = StyleSheet.create({

  "view_tela": {
    "backgroundColor": "rgba(0,0,0,1)",
    "alignSelf": "stretch",
    "flex": 1,
    "flexDirection": "column",
    "justifyContent": "flex-start",
    "alignItems": "center"
  },
  "bt_back": {
    "position": "absolute",
    "borderRadius": 5,
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "rgba(0,0,0,1)",
    "width": 40,
    "height": 40,
    "left": 5,
    "top": 5
  },
  "image_back": {
    "width": 30,
    "height": 30,
    "marginLeft": 0,
    "marginTop": 0
  },
  page: {
    flex: 1,
    "backgroundColor": "rgba(0,0,0,0.5)",
    "alignSelf": "stretch"
  },
  box: {
    "alignSelf": "stretch",
    flex: 1
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  group_item: {
    margin: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridview_1: {
    "alignSelf": "stretch",
    "flex": 1
  }

});