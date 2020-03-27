'use strict';
import React from 'react';
import {Modal,Alert,StyleSheet,View,Text,TouchableOpacity,TextInput} from "react-native";
import ImageUpload from './ImageUpload';


export default class FotosUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos:0,
      open:false
    };
  }

  setPos(pos){
    let{value=[]}=this.props;
    if(pos < value.length) this.setState({pos});
  }
  novo(){
    let{value=[{url_img:''}],onChange}=this.props;
    // alert(JSON.stringify(value))

    value.push({url_img:""});
    onChange(value);
    setTimeout( ()=> {

      this.setState({pos:(value.length-1)});
    }, 100);
    // alert(JSON.stringify(value)) 
  }
  delete(){
    let{value=[],onChange}=this.props;
    Alert.alert(
      'Apagar',
      'Deseja apagar este item N:'+(this.state.pos+1)+'?',
      [
        {text: 'Sim', onPress: () => {
          value.splice(this.state.pos, 1);
          this.setState({pos:(this.state.pos-1)});
          onChange(value)
        }},
        {text: 'Não', onPress: () => console.log()}
      ]
    )
  }
  render() {
    let {value,onChange,style,...prop}=this.props;
    if(!value)value=[{}];
    let{pos}=this.state;
    if(pos >= value.length) pos=0;
    return (
      <View style={[styles.body,style]} >
        <ImageUpload
          {...prop}
          style={ styles.image}
          value={value[pos].url_img }
          onChange={ (text,data={}) => {
            value[pos].url_img = text;
            value[pos].url_menos = data.url_menos;

            onChange(value,pos,text,data);
            this.setState({pos});
          }}
          />
        <View   style={styles.containerButtons}>
          {value.map((object, key)=>(
            <TouchableOpacity
              key={key+"k"}
              style={[styles.marcador,{backgroundColor:( key==pos ? "#000":"#777")}]}
              onPress={()=>{
                this.setState({pos:key});
              }}>
              <Text
                style={[styles.icon,{fontWeight:"bold"}]}>
                {(key+1)}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={styles.containerActions}>
            <TouchableOpacity
              style={styles.marcador}
              onPress={()=>{
                this.novo();
              }}>
              <Text
                style={styles.iconAction}>
                {"+"}
              </Text>
            </TouchableOpacity>
            {value.length>1?(
              <TouchableOpacity
                style={[styles.marcador,{alignSelf:"flex-end"}]}
                onPress = {()=>{
                  this.delete()
                }}>
                <Text
                  style={styles.iconAction}>
                  {"-"}
                </Text>
              </TouchableOpacity>
            ):null}
          </View>
        </View>
        {this.props.description?(
          <TouchableOpacity   style={styles.buttonEdit}  onPress = {()=>{
              this.setState({open:true});
            }}  >
            <Text
              style={styles.iconAction}>
              {"i"}
            </Text>
          </TouchableOpacity>
        ):null}
        <Modal
          animationType={"fade"}

          transparent={true}
          onRequestClose={() => {
            this.setState({open:false});
          }}
          visible={this.state.open}
          >
          <Descricao
            item={value[pos]}
            onClose={()=>this.setState({open:false})}
            onSalve={(item)=>{
              value[pos].nome=item.nome
              value[pos].descricao=item.descricao
              this.setState({open:false});
              onChange(value);
            }}
            numero={(pos+1)}/>

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


const Input=(prop)=>[
  <Text style={{fontSize:11,marginTop:12}} >{prop.label}</Text>,
    <TextInput
      {...prop}
      value={ prop.value||'' }
      onChangeText={ (value) => {
        prop.onChange(value);
      } }
      />,
    <View style={{"alignSelf": "stretch",height:1,backgroundColor:"#ccc",marginBottom:2}}/>
  ]

  class Descricao extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        item:this.props.item||{}
      }
    }
    render(){
      return(
        <View style={ styles.view }>
          <View style={ styles.view1 }>
            <View style={ styles.view2 }>
              <TouchableOpacity style={ styles.bottom } onPress={ () => {
                  this.props.onClose()
                } }>
                <Text
                  style={[styles.iconAction,{color:'#000'}]}>
                  {"x"}
                </Text>
              </TouchableOpacity>
              <Text style={ styles.label }>{ "Informações da foto  "+(this.props.numero ?"número:" +this.props.numero :"")} </Text>
              <TouchableOpacity style={ styles.bottom1 } onPress={ () => {
                  this.props.onSalve(this.state.item)
                } }>
                <Text style={[styles.iconAction,{color:'#000',fontSize:20}]}>
                  {"Salvar"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={ styles.view3 }>
              <Input style={ styles.nome }
                value={ this.state.item.nome }
                onChange={ (value) => {
                  this.state.item.nome = value ;

                } }
                label={ "Título" } />
              <Input style={ styles.descricao }
                value={ this.state.item.descricao }
                onChange={ (value) => {
                  this.state.item.descricao = value ;

                } } ref={ (v) => this.descricao = v }
                keyboardType={ "default" }
                secureTextEntry={ false }
                multiline={ true } label={ "Descrição" } />

            </View>
          </View>
        </View>
      )
    }
  }

  var styles = StyleSheet.create(
    {
      "body": {
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column",
        minHeight:150,
        minWidth:100,
        alignSelf:"stretch",
        flex: 1,
      },
      image:{
        "alignSelf": "stretch",
        backgroundColor:"#ccc",
        "flex": 1
      },
      containerButtons:{
        flexWrap: "wrap",
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:"flex-start",
        alignSelf:"stretch"
      },
      containerActions:{
        // flexWrap: "wrap",
        flexDirection:"row",
        alignItems:"flex-end",
        justifyContent:"flex-end",
        flex:1,
        minWidth:120
      },
      icon:{
        "color": "#fff",
        "fontSize": 25,
        fontWeight:"bold"
      },
      labelInput:{
        marginTop:10,
        "fontSize": 14,
      },
      marcador:{
        width:50,
        height:50,
        backgroundColor:"rgba(0,0,0,0.5)",
        marginRight:2,
        marginTop:5,
        alignItems:"center",
        borderRadius:5,
        justifyContent:"center",
      },
      buttonEdit:{
        width:50,
        height:50,
        backgroundColor:"rgba(0,0,0,0.5)",
        marginRight:2,
        marginTop:5,
        alignItems:"center",
        borderRadius:5,
        justifyContent:"center",
        position:"absolute",
        right:10,
        top:10
      },
      iconAction:{
        "color": "#fff",
        "fontSize": 35,
        fontWeight:"bold",
        marginBottom:5
      },
      "nome": {
        "minHeight": 35,
        "color": "rgba(0,0,0,1)",
        "alignSelf": "stretch",
        "textAlign": "left",
        "flexWrap": "nowrap",
      },
      "descricao": {
        "minHeight": 35,
        "color": "rgba(0,0,0,1)",
        "alignSelf": "stretch",
        "textAlign": "left",
        "flexWrap": "nowrap",
      },
      "view": {
        "flex": 1,
        "flexDirection": "column",
        "alignItems": "flex-start",
        "justifyContent": "flex-start",
        "flexWrap": "nowrap",
        "position": "relative",
        "padding": 30,
        "backgroundColor": "rgba(0,0,0,0.3)"
      },
      "view1": {
        "alignSelf": "stretch",
        // "flex": 1,
        padding:5,
        "flexDirection": "column",
        "alignItems": "flex-start",
        "justifyContent": "flex-start",
        "flexWrap": "nowrap",
        borderRadius:5,
        "position": "relative",
        "backgroundColor": "rgba(255,255,255,1)"
      },
      "view2": {
        "alignSelf": "stretch",
        "flexDirection": "row",
        "alignItems": "center",
        "justifyContent": "center",
        "flexWrap": "nowrap",
        "position": "relative",
        "height": 50,
      },
      "bottom": {
        "alignSelf": "stretch",
        "justifyContent": "center",
        "alignItems": "center",
        "height": 50,
        "flexDirection": "column",
        "flexWrap": "nowrap",
        "position": "relative",
        "width": 50
      },
      icon5: {
        "color": "rgba(150,150,145,1)",
        "fontSize": 25
      },
      "label": {
        "textAlign": "center",
        "flexWrap": "wrap",
        "flex": 1
      },
      "bottom1": {
        "alignSelf": "stretch",
        "justifyContent": "center",
        "alignItems": "center",
        "height": 50,
        "flexDirection": "column",
        "flexWrap": "nowrap",
        "position": "relative",
        "width": 100
      },
      "view3": {
        "alignSelf": "stretch",
        // "flex": 1,
        "flexDirection": "column",
        "alignItems": "flex-start",
        "justifyContent": "flex-start",
        "flexWrap": "nowrap",
        "position": "relative",
        "padding": 10
      },
    }
  );
