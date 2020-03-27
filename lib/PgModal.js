'use strict';
import React from 'react';
import { StyleSheet,View,  Modal} from "react-native";
// import Modal from 'react-native-modalbox';
import Nav from './Nav';
let _ref=null;


export default class ModalNav extends React.Component {
  constructor(props) {
    super(props);
    _ref=this;
    this.state = {
      prop:{},
      Component:View,
      propsModal:{},
      modalVisible:false
    };
  }


  openModal=(Component=View,prop={},propsModal={})=>{
    this.setState({propsModal,Component,prop,modalVisible:true})
    // this.setState({propsModal,Component,prop},()=>this.refs.modal1.open())
  }
  closeModal=()=>{
    this.setState({propsModal:{},Component:View,prop:{},modalVisible:false})
  }

  render() {
    const{propsModal,Component,prop}=this.state;
    return (
      <Modal
        style={styles.tela}
        ref={"modal1"}
        animationType="slide"
        transparent={true}
        {...propsModal}
        visible={this.state.modalVisible}
        >
        <Nav InitComponent={Component} closeModal={closeModal} propsInit={{...prop,closeModal,openModal:()=>openModal()}} screenProps={this.props.screenProps}/>
      </Modal>
    );
  }
}


var styles = StyleSheet.create(
  {
    "tela": {
      "flex": 1,
      "alignSelf": "stretch",
    },
  }
);

export function openModal(...args) {
  if (_ref) {
    _ref.openModal(...args);
  }
}
export function closeModal(...args) {
  if (_ref) {
    _ref.closeModal(...args);
  }
}
