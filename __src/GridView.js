import React, { Component } from 'react';
import { View,Platform ,StyleSheet} from 'react-native';
import ListView from 'deprecated-react-native-listview'


export default  class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = { lista:props.dataSource, dataSource :  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})    };
    this.state.dataSource =   this.setLista(props.dataSource);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps!= this.props){
      nextState.lista = nextProps.dataSource;// this.state.dataSource.cloneWithRows(nextProps.dataSource)
      nextState.dataSource = this.setLista(nextProps.dataSource);
      // console.log(nextProps.dataSource);
    }
    return true;
  }

  setLista(lista){
    if(!lista){return this.state.dataSource;}
    this.pos = 0;
    if (!this.props.column) {
      this.itemsPerRow = 2;
    }else{
      this.itemsPerRow = parseInt(this.props.column);
    }

    var groups = this.groupItems(lista, this.itemsPerRow);
    return this.state.dataSource.cloneWithRows(groups);
  }
  groupItems(items, itemsPerRow) {
    var itemsGroups = [];
    var group = [];
    // console.log(items);
    items.forEach(function(item) {
      if (group.length === itemsPerRow) {
        itemsGroups.push(group);
        group = [item];
      } else {
        group.push(item);
      }
    });
    if (group.length > 0) {
      itemsGroups.push(group);
    }
    return itemsGroups;
  }

  row_gridview_1(rowData , sectionID, rowID) {
    if (rowID==0) {
      this.pos=0;
    }
    // console.log(rowData);
    for (var i = 0; i < this.itemsPerRow; i++) {
      if (!rowData[i]) {
        rowData[i]  = false;
      }
    }
    var items = rowData.map((item) =>{
      this.pos++;
      let cell = (<View></View>);
      if (item) {
        cell = this.props.renderRow(item,sectionID,(this.pos-1));
      }


      return (
        <View style={{
            // height:50,
            // backgroundColor:"#000",
            margin:this.props.margin ? this.props.margin:0,
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
          }} key={this.pos+"_cell"} >
          {cell}
        </View>
      );
      // return this.props.renderItem(item,sectionID,(this.pos-1));
    });

    let   group=  {
      // height:50,
      // backgroundColor:"#ccc",
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
    if(this.props.itemsH){
      group.height = this.props.itemsH;
    }
    return (
      <View style={group}>
        {items}
      </View>
    );
  }



  render() {


    var style = {};

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

    return (
      <ListView style={style}
        enableEmptySections={true}
        refreshControl={this.props.refreshControl}
        automaticallyAdjustContentInsets={false}
        dataSource={this.state.dataSource}
        renderRow={ (rowData , sectionID, rowID)=>this.row_gridview_1(rowData , sectionID, rowID) } >
      </ListView>
    );
  }
}
