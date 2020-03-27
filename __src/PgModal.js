'use strict';
import React from 'react';
import { StyleSheet,View} from "react-native";
import Modal from 'react-native-modalbox';

// import { KeyboardAvoidingView, Platform, Linking, Share } from "react-native-1app";
let _ref=null;

//nao atualizar
export default class PgModal extends React.Component {
  constructor(props) {
    super(props);
    _ref=this;
    this.state = {
      heranca: {},
      open:false,
      prop:{},
      Component:View,
      propsModal:{}
    };
  }

  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just opened');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  openModal=(Component=View,prop={},propsModal={})=>{
    this.setState({Component,prop,propsModal},()=>this.refs.modal1.open())
    // this.refs.modal1.open()
  }
  closeModal=()=>{
    // this.setState({open: !this.state.open })
    this.refs.modal1.close()
  }

  render() {
    const{Component,prop,propsModal}=this.state;
    return (
      <Modal
        style={styles.tela}
        // visible={this.state.open}
        // onRequestClose={() => {
          //   this.setState({ open: false });
          //   this.closeModal()
          // }}
          // transparent={true}

          ref={"modal1"}
          // swipeToClose={false}
          backButtonClose={true}
          key='modal_nave'
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}
          {...propsModal}
          >
          <Component
            key="compe_modal"
            {...prop}
            screenProps={this.props.screenProps}
            />
        </Modal>
      );
    }
  }
  var styles = StyleSheet.create(
    {
      "tela": {
        "flex": 1,
        "alignSelf": "stretch"
      }
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
