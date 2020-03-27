import React, { Component } from 'react';
import { View,Platform ,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import Icon from './Icon';
import ListView from 'deprecated-react-native-listview'

export default  class ApiListView extends Component {

  constructor(props) {
    super(props);
    this.state = { lista:props.dataSource, ordem:[],dataSource :  new ListView.DataSource({rowHasChanged: (r1, r2) => {
      // r1 !== r2
      // console.log(r1 !== r2);
      // console.log(r1,r2);
      if(props.forceUpdate || this.state.forceUpdate){
        return true;
      }else{
        return r1 !== r2;
      }
    }})      };
    if(props.ordem){
      this.state.ordem = this.getOrdem(this.state.lista);
    }
    if (props.dataSource) {
      this.state.dataSource = this.state.dataSource.cloneWithRows(props.dataSource);
    }
    this.listHeight=0;
  }

  moveArry(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  }

  moveUp(rowID, rowData) {
    if(!this.state.lista){
      return;
    }
    var pos = 0;
    for (var i = this.state.lista.length - 1; i >= 0; i--) {
      var foco = this.state.lista[i];
      var to = i + -1;
      if (foco == rowData &&  to >= 0) {
        this.moveArry(this.state.lista, i, to);
        var data =  this.getOrdem(this.state.lista);
        this.setState({ordem:data,forceUpdate:true})
        if(this.props.onChange){
          this.props.onChange(data);
        }
        break;
      }
    }

  }

  moveDown(rowID, rowData) {
    if(!this.state.lista){
      return;
    }
    var pos = 0;
    for (var i = 0; i < this.state.lista.length; i++) {
      var foco = this.state.lista[i];
      var to = i + 1;
      if (foco == rowData &&  this.state.lista.length-1 >= to) {
        this.moveArry(this.state.lista, i, to);
        var data =  this.getOrdem(this.state.lista);
        this.setState({ordem:data,forceUpdate:true})
        if(this.props.onChange){
          this.props.onChange(data);
        }
        break;
      }
    }
  }

  getOrdem(lista){
    if(!lista){
      return;
    }
    var ordem = [];
    for (var i = 0; i < lista.length; i++) {
      var item =  lista[i];
      var id = item.objectId ? item.objectId : item._id;
      if(id){
        ordem.push(id);
      }
    }
    return ordem;
  }




  componentDidMount() {
    if(this.listview){
      this.scrollResponder = this.listview.getScrollResponder();
    }
  }

  scrollToBottom(){

    // this.scrollResponder.scrollTo({  y: 1000, });
  }
  scrollToTop(){
    this.scrollResponder.scrollTo({  y: 0 });
  }
  scrollTo(y){
    this.scrollResponder.scrollTo({  y: y });
  }


  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps!= this.props){
      nextState.lista = nextProps.dataSource;
      if(nextProps.ordem){
        nextState.ordem = this.getOrdem(nextProps.dataSource);
      }
      if(nextProps.dataSource){
      nextState.dataSource = this.state.dataSource.cloneWithRows(nextProps.dataSource);
      }
    }
    return true;
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
    if(this.props.horizontal){
      var cells = [];
      for (var i = 0; i < this.state.lista.length; i++) {
        let rowData =  this.state.lista[i];
        if(this.props.renderRow){
          var cell= this.props.renderRow(rowData , 1, i);
          cells.push(
            <View key={"cell__"+i} style={{alignSelf:"stretch"}}>
              {cell }
            </View>
          );
        }
      }
      return (
        <ScrollView      automaticallyAdjustContentInsets={false}   refreshControl={this.props.refreshControl} horizontal={true}
           style={[style,{flexDirection:"row",alignSelf:"auto",flex:0}]}>
          {this.props.renderHeader ? this.props.renderHeader():null}
          {cells}
          {this.props.renderFooter ? this.props.renderFooter():null}
        </ScrollView>
      );
    }
    // console.log(this)
    if(this.props.dinamic){
      var cells = [];
      var striped = this.props.striped? {backgroundColor:this.props.striped}:{};
      for (var i = 0; i < this.state.lista.length; i++) {
        let rowData =  this.state.lista[i];
        // console.log(striped,this.props.stretch)
        if(this.props.renderRow){
          var cell= this.props.renderRow(rowData , 1, i);
          cells.push(
            <View key={"cell__"+i} style={[{alignSelf:"stretch"   },(i % 2) > 0 ? striped : {}]}>
              {cell }
            </View>
          );
        }
      }
      return (
        <ScrollView      automaticallyAdjustContentInsets={false}   refreshControl={this.props.refreshControl} horizontal={false}
           style={[style,{flexDirection:"column"}]}>
          {this.props.renderHeader ? this.props.renderHeader():null}
          {cells}
          {this.props.renderFooter ? this.props.renderFooter():null}
        </ScrollView>
      );
    }

    return (
      <ListView 
      removeClippedSubviews={this.props.removeClippedSubviews}
      style={[style,{ }]}
        onLayout={(event) => {
          var layout = event.nativeEvent.layout;
          this.listHeight = layout.height;
        }}

        enableEmptySections={true}
        ref={(v)=>this.listview=v}
        refreshControl={this.props.refreshControl}
        dataSource={this.state.dataSource}
        automaticallyAdjustContentInsets={false}
        renderFooter={()=>{
          if(this.props.renderFooter){
            var cell= this.props.renderFooter();
            if(cell){
              return cell;
            }else{
              return (<View />);
            }
          }else{
            return (<View />);
          }
        }}

        renderHeader={this.props.renderHeader?()=>{  return this.props.renderHeader();}:null}
        renderSeparator={(sectionID, rowID) => {
          if(this.props.renderSeparator){
            return this.props.renderSeparator();
          }else{
            return (<View key={sectionID+"-"+rowID+"separetor"} style={{
              height: 1,
              backgroundColor: this.props.colorSeparator? this.props.colorSeparator : "rgba(224,224,224,1)"
            }} />);
          }
        }}
        renderRow={ (rowData , sectionID, rowID)=>{
          if(this.props.renderRow){
            var cell= this.props.renderRow(rowData , sectionID, rowID);
            if(cell){
              if(this.props.ordem){
                return (
                  <View        style={{  alignSelf:"stretch",flexDirection:"row" , justifyContent:"center","alignItems": "center"}} >
                    <View style={{alignSelf:"stretch",flex:1}}>
                      {cell}
                    </View>

                    <View style={ styles.view }>
                      <TouchableOpacity style={ styles.bottom } onPress={ () => {
                          this.moveUp(rowID,rowData);
                        } }>
                        <View style={ styles.view2 }>
                          <Icon style={ styles.icon } fromFontFamily={ "Material Icons" } icon={ "keyboard_arrow_up" } />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={ styles.bottom } onPress={ () => {
                          this.moveDown(rowID,rowData);
                        } }>
                        <View style={ styles.view2 }>
                          <Icon style={ styles.icon } fromFontFamily={ "Material Icons" } icon={ "keyboard_arrow_down" } />
                        </View>
                      </TouchableOpacity>

                    </View>
                  </View>
                )
              }else{
                return cell;
              }
            }else{
              return (<View />);
            }
          }else{
            return (<View />);
          }
        }}
        />
    );
  }
}



const styles = StyleSheet.create({

  "view": {
    "alignSelf": "stretch",
    "flexDirection": "column",
    "alignItems": "flex-start",
    "justifyContent": "flex-start",
    "flexWrap": "nowrap",
    "position": "relative",
    "width": 55,
    "minWidth": 55,
    "minHeight": 70
  },
  "bottom": {
    "alignSelf": "stretch",
    "justifyContent": "center",
    "alignItems": "center",
    // backgroundColor:"#ccc",
    "flexDirection": "column",
    "flexWrap": "nowrap",
    "flex": 1
  },
  "view2": {
    "alignSelf": "auto",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "flexWrap": "nowrap",
    "position": "relative",
    "width": 30,
    "height": 30
  },
  "icon": {
    "fontSize": 25,
    "color": "#CCC"
  },
});
