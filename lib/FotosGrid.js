import React, { Component } from "react";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Platform,
  ImageBackground,
  Image,
  Modal,
  SafeAreaView
} from "react-native";
import GridView from "react-native-super-grid";
import ImageViewer from 'react-native-image-zoom-viewer';
// import SafeAreaView from 'react-native-safe-area-view';

export default class PgIngresso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open:false
    };
    this.index=0;
  }


  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let{styleItem={},list=[],style={},propsGrid={},itemDimension=100}=this.props;
    return (
      <View style={[styles.view10,style]}>
        <GridView
          style={[styles.gridview,style]}
          spacing={5}
          {...propsGrid}
          itemDimension={itemDimension}
          items={list}
          renderItem={({item,index}, sectionID, rowID) => {
            return (
              <TouchableOpacity
                style={[styles.cell,styleItem]}
                onPress={()=>{
                  this.index=index;
                  this.setState({open:true});
                }} >
                <Image style={styles.image} source={{ uri: item.url_img }} />
              </TouchableOpacity>
            );
          }}
          />
        <Modal
          animationType={"slide"}
          visible={this.state.open}
          onRequestClose={() => {
            this.setState({open:false})
          }}>
          <ImageViewer
            imageUrls={list.map(a=>({url:a.url_img}))}
            index={this.index}
            saveToLocalByLongPress={false}
            renderHeader={(index)=>{
              return(
                <SafeAreaView style={styles.titlebar} forceInset={{ top: 'always',bottom:'never' }}>
                  <TouchableOpacity style={styles.button}
                    onPress = {()=>{
                        this.setState({open:false});
                    }}  >
                    <Image style={styles.icon}
                      resizeMode = {"cover"}   source={{uri: base64Icon, scale: 1}} >
                    </Image>
                  </TouchableOpacity>

                  {this.props.compartilar&&
                    <TouchableOpacity style={styles.button}
                      onPress = {()=>{
                        this.props.compartilar((list[index]||{}).url_img)
                      }}  >
                      <Image style={styles.icon}
                        resizeMode = {"cover"}   source={{uri: base64IconCompartilhar, scale: 1}} >
                      </Image>
                    </TouchableOpacity>
                  }
                </SafeAreaView>
              )
            }}
            />
        </Modal>
      </View>
    );
  }
}


let base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXM'
+'AAABIAAAASABGyWs+AAAACXZwQWcAAAAYAAAAGAB4TKWmAAAAUElEQVRIx2NgGAVDCvz//z/q////tbQ0/M9/CHCgpeENo4YPL8NJBujmMVHVdWT6on7'
+'UkpFpiQOx+liIVcjIyLgMmsxVGBkZD9DEF6OAJgAAorj7ZBCISyAAAAAASUVORK5CYII=';
let base64IconCompartilhar = `data:image/png;base64,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`

var styles = StyleSheet.create({
  view10: {
    alignSelf: "stretch",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  icon:{
    "width": 30,
    "height": 30,
    "marginLeft": 0,
    "marginTop": 0,
    tintColor:"rgba(255,255,255,1)",
  },
  titlebar: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
    height: 50,
    backgroundColor: "rgba(22,22,22,0)",
    marginBottom:-50,
    zIndex:10000,
  },
  button:{
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "width": 50,
    "height": 50,
  },
  gridview: {
    alignSelf: "stretch",
    flex: 1,
    backgroundColor: "rgba(22,22,22,1)",

  },
  cell: {
    flexDirection: "row",
    alignSelf: "stretch",
    flex: 1,
    height:130,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    alignSelf: "stretch",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
});
