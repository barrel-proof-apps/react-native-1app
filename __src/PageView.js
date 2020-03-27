import React, { Component } from "react";
import { View, Platform, StyleSheet } from "react-native";
import ViewPager from '../pageview/ViewPager';

export default class ApiPageView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lista: props.dataSource,
      dataSource: new ViewPager.DataSource({
        pageHasChanged: (r1, r2) => r1 !== r2
      }),
      pg: 0
    };
    this.tratarStyle(props);

    if (props.dataSource) {
      this.state.dataSource = this.state.dataSource.cloneWithPages(
        props.dataSource
      );
    }
    if (this.props.play) {
      this.ativo = true;
      this.loop();
    }
    this.change =  new Date().getTime() ;

  }
  componentWillUnmount(){
    this.ativo = false;
  }
  componentDidMount(){
    this.ativo = true;
  }
  getLength() {
    if (this.props.dataSource) {
      return this.props.dataSource.length;
    } else {
      return 0;
    }
  }

  getProximo() {
    if (  this.state.index + 1 <= this.getLength()-1) {
      return this.state.index + 1;
    } else {
      return 0;
    }
  }
  loop() {
    var sleep = this.props.time ? this.props.time : 4000;
    setTimeout(() => {
      if (this.props.play && this.ativo  ) {
        var dif = new Date().getTime() - this.change  ;
        if (this.state.humano || this.getLength() == 0   || sleep - 1000 > dif ) {//|| sleep - 1000 < dif
          this.setState({ humano: false });
          this.loop();
          return;
        }
        this.time = new Date().getTime();
        var page = this.getProximo();
        if(lista && lista.length){
        this.goToPage(page);
        }
        this.loop();
      }
    }, sleep);
  }
  goToPage(index) {
    if (this.pageview) {
      this.state.index = index;
      this.setState({index:index})
      this.pageview.goToPage(index);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      nextState.lista = nextProps.dataSource;
      nextState.dataSource = this.state.dataSource.cloneWithPages(
        nextProps.dataSource
      );
      this.goToPage(0)
    }

    return true;
  }

  getIndicadores() {
     if(this.props.rederIndicator){
      return  this.props.rederIndicator(this.state.index?this.state.index:0,this.state.lista?this.state.lista:[]);
    }
    // if(this.props.onChange || this.props.onChangePage){
    //   return null;
    // }
    var itens = [];
    if (!this.state.lista) {
      return itens;
    }
    for (var i = 0; i < this.state.lista.length; i++) {
      itens.push(
        <View
          key={i + "mark"}
          style={{
            borderStyle: "solid",
            borderColor: "#000",
            borderWidth: 2,
            backgroundColor: i == this.state.pg ? "#000" : "#fff",
            borderRadius: 5,
            width: 10,
            height: 10,
            margin: 3
          }}
          />
      );
    }
    return (
      <View
        style={{
          alignSelf: "stretch",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 10
        }}
        >
        {itens}
      </View>
    );
  }
  tratarStyle(props){
    var style = {};

    if (props.style) {
      var lista = [];
      if (Array === props.style.constructor) {
        lista = props.style;
      } else {
        lista.push(props.style);
      }
      for (var a = 0; a < lista.length; a++) {
        var st = lista[a];
        if (typeof st === "object" && st !== null) {
          //nada
        } else if (st) {
          st = StyleSheet.flatten(props.style);
        } else if (!st) {
          continue;
        }
        var tags = Object.keys(st);
        for (var i = 0; i < tags.length; i++) {
          style[tags[i]] = st[tags[i]];
        }
      }
    }
    this.styles =  StyleSheet.create({view:style});
  }

  render() {
    // console.log(this.state);

    // console.log("render");
    // console.log(style);
    return (
      <View style={this.styles.view}>
        <ViewPager
          ref={(v)=>this.pageview=v}
          isLoop={false}
          initialPage={0}
          {...this.props}
          autoPlay={false}
          style={{
            alignSelf: "stretch",
            flex: 1
          }}
          onChangePage={index => {
            this.change = new Date().getTime();

            this.setState({ pg: index,index:index , humano: new Date().getTime()- this.time  < 1000 ? false:true    });
            if (this.props.onChangePage) {
              this.props.onChangePage(index);
            }
            if (this.props.onChange) {
              this.props.onChange(index);
            }

          }}
          renderPageIndicator={false}
          dataSource={this.state.dataSource}
          renderPage={(rowData, rowID) => {
            // console.log(rowData);
            if (this.props.renderRow) {
              return this.props.renderRow(rowData, 1, rowID);
            } else {
              return <View />;
            }
          }}
          />
        {this.getIndicadores()}
      </View>
    );
  }
}
