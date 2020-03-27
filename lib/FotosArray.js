'use strict';
import React from 'react';
import {Alert,StyleSheet,View,Text,TouchableOpacity,ActivityIndicator,ImageBackground,Modal,Dimensions,Image} from "react-native";
import GridView from "react-native-super-grid";
// import ImageZoom from 'react-native-photo-view';
// import {ImageUpload} from 'react-native-1app'
import ImageUpload from './ImageUpload'
import ImageViewer from 'react-native-image-zoom-viewer';
import SafeAreaView from 'react-native-safe-area-view';



export default class FotosUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos:0,
      open:false
    };
    this.index=0;
  }

  setPos(pos){
    let{value=[]}=this.props;
    if(pos < value.length) this.setState({pos});
  }


  upLoad() {
    let {value=[],onChange}=this.props;
    ImageUpload.pegarFoto( base64 => {
      if(!base64) return;
      this.setState({ load: true });
      ImageUpload.upLoad(base64,(link,error)=>{
        this.setState({ load: false });
        if(!value) value=[];
        value.push({url_img:link})
        onChange(value);
      },this.props)
    },this.props);
  }

  delete(index){
    let{value,onChange}=this.props;
    Alert.alert(
      'Apagar',
      'Deseja apagar este item N:'+(index+1)+'?',
      [
        {text: 'Sim', onPress: () => {
          value.splice(index, 1);
          this.setState({pos:(index-1)});
          onChange(value)
        }},
        {text: 'Não', onPress: () => console.log()}
      ]
    )
  }

  render() {
    let{value,onChange,style,styleImage,itemDimension,disabled,...prop}=this.props;
    if(!value)value=[];
    let{pos}=this.state;
    if(pos >= value.length) pos=0;
    return (
      <View style={[styles.body,style]}>
        <GridView
          style={styles.gridview}
          itemDimension={itemDimension}
          spacing={5}
          items={[...value,{add:true}]}
          renderItem={({item,index}, sectionID, rowID) => {
            if(disabled) return null;
            if(item.add) return(
              <TouchableOpacity
                style={[styles.bottonAdd,styleImage]}
                disabled={this.state.load}
                onPress={()=>{


                  this.upLoad();
                }} >
                {!this.state.load&&[
                  <Text
                    style={styles.iconAction}>
                    {"+"}
                  </Text>,
                  <Text  style={styles.text}>
                    {"Adicionar foto"}
                  </Text>
                ]||
                <ActivityIndicator
                  style={[ { backgroundColor:"rgba(0,0,0,0)"}]}
                  />
              }
            </TouchableOpacity>
          )
          return (

            <TouchableOpacity
              style={[styles.itemImagem,styleImage]}
              disabled={disabled}
              onPress={()=>{
                this.index=index;
                this.setState({open:true});
              }} >

              <Image
                source={{uri:item.url_img }}
                style={styles.itemImagem}
                onLoadStart={(e) => this.setState({["load"+index]: true})}
                onLoadEnd={(e) => this.setState({["load"+index]: false})} />

              {this.state["load"+index]&&
                <View  style={styles.bodyLoad}>
                  <ActivityIndicator
                    style={{height: 80}}
                    size="large"
                    />
                </View>
              }
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
          imageUrls={value.map(a=>({url:a.url_img}))}
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
                    resizeMode = {"cover"}   source={{uri: iconVoltor, scale: 1}} >
                  </Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress = {()=>{
                    this.delete(index);
                  }}  >
                  <Image style={styles.icon}
                    resizeMode = {"cover"}   source={{uri: iconDeletar, scale: 1}} >
                  </Image>
                </TouchableOpacity>
              </SafeAreaView>
            )
          }}
          />
      </Modal>
    </View>
  );
}
}

FotosUpload.defaultProps={
  label:null,
  onChange:()=>console.log("not onChange"),
  style:{},
  styleImage:{},
  onResposta:(res,error)=>({result:res,error}),
  itemDimension:100,
  disabled:false
};

var styles = StyleSheet.create(
  {
    "body": {
      justifyContent: "center",
      alignItems: "center",
      flexDirection:"column",
      minWidth:100,
      alignSelf:"stretch",
      flex: 1,
    },
    bodyLoad:{
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: "absolute",
      justifyContent: "center", alignItems: "center"
    },
    gridview: {
      alignSelf: "stretch",
      flex: 1
    },
    itemImagem: {
      alignSelf: "stretch",
      flex: 1,
      "backgroundColor": "rgba(250,250,250,1)",
      height:100,
      borderRadius:10
    },
    viewAdd: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection:"column",
      alignSelf:"stretch",
      flex: 1,

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
    bottonAdd:{
      justifyContent: "center",
      alignItems: "center",
      flexDirection:"column",
      alignSelf:"stretch",
      "backgroundColor": "rgba(250,250,250,1)",
      flex: 1,
      height:100,
      borderRadius:10
    },
    iconAction:{
      "color": "rgba(66,66,66,1)",
      "fontSize": 35,
      fontWeight:"bold",
      marginBottom:5
    },
    imagenIcon:{
      "width": 30,
      "height": 30,
      "marginLeft": 0,
      "marginTop": 0,
      tintColor:"rgba(255,255,255,1)"
    },
    text:{
      alignSelf: "stretch",
      textAlign: "center",
      fontSize: 11,
      fontWeight: "800",
      color: "rgba(66,66,66,1)",
    },
    bottonAction:{
      "position": "absolute",
      "borderRadius": 5,
      "flexDirection": "column",
      "alignItems": "center",
      "justifyContent": "center",
      "backgroundColor": "rgba(0,0,0,0.5)",
      "width": 50,
      "height": 50,
      "top": 20
    }
  }
);


let iconVoltor=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXM
AAABIAAAASABGyWs+AAAACXZwQWcAAAAYAAAAGAB4TKWmAAAAUElEQVRIx2NgGAVDCvz//z/q////tbQ0/M9/CHCgpeENo4YPL8NJBujmMVHVdWT6on7
UkpFpiQOx+liIVcjIyLgMmsxVGBkZD9DEF6OAJgAAorj7ZBCISyAAAAAASUVORK5CYII=`
let iconDeletar=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHsSURBVGhD7Zo9LwRBHIdXKDQICirfQKnzBURBQ0QnGomGTqIV0WvQeul9AY2ERhSCAlEoFV4bEm+/31w2mbid3f/eXmaG/J/kSW7G3u49cju395Io/5geuA2f4XeBN3AGRsk+zHrQeY7CqOiEn/AR9nOigAXIkD0ziogByAd2ZkbFDENuf2hGHmiF3QIHIR/YhTWX5wjk9sfWXJ4dsGEYcQ15wBhcgg3RAg8gn/fc0Rd88Ogr5HHf4T2chZXogtzhkxn5gysaj7trRk1AQyqiIS40pCIa4kJDKqIhLiQhfFPVXrtZCt6vrXazDu8h/PsLPId9nBAyCd/glhnV4z2E/9ETyG14GS+JYcQH5H3mOZFBsKfWKZTE2BHLnHAQ7GSXxEgjSLAQkhdTJoIEDSFZMWUjSPAQYsfcwrIRJIoQwpgryPvSNViGaELspxOVLs0pUYTYEStQujTbBA/JOrElS/NvgobkrU52zCUsigkWIlliy8QECZFEpEhjvIf0Qn4aKIlIsWN2OJGB9xB+RrwO58xIDmN4CT9uRvUEPdmbiYa40JCKaIgLDamIhrjgN6rcIX/R4JMxyOO6Xvkb4g5yp6twwoPT8AjymNLLHhFTML0o9Cl/s8Lv2ZvKEOT77k0PbsBFyJ+GKH+QJPkBOhGDQXgfyKIAAAAASUVORK5CYII=`
