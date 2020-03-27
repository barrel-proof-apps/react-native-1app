import React, { Component } from "react";
import { View, Modal } from "react-native";
import SnackBar from "react-native-snackbar-component";

export default class NavigatorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  componentDidMount() {}

  alert(text, wait) {
    this.setState({
      alert: text,
      openAlert: true,
      loadAlert: wait ? true : false,
      wait: wait
    });
    setTimeout(() => {
      this.setState({
        openAlert: false,
        loadAlert: false,
        wait: false,
        alert: "---"
      });
    }, 3000);
  }
  closeAlert() {
    this.setState({
      openAlert: false,
      loadAlert: false,
      wait: false
    });
    setTimeout(() => {
      this.setState({
        openAlert: false,
        loadAlert: false,
        wait: false,
        alert: "---"
      });
    }, 500);
  }

  openModal(options) {
    this.setState({
      modal: options.component,
      propsModal: options.props
    });
  }
  closeModal() {
    this.setState({
      modal: false,
      propsModal: null
    });
  }
  render() {
    return (
      <View style={this.props.style}>
        {this.props.children}

        <Modal
          animationType={"fade"}
          transparent={true}
           onRequestClose={() => {
             this.setState({modal:false})
           }}
          visible={this.state.modal ? true : false}
          >
          {this.state.modal
            ? <this.state.modal
            navigator={this}
            navigation={this.props.navigation}
            screenProps={this.props.screenProps}
            {...this.props.screenProps}
            {...this.state.propsModal}
            />
          : null}
        </Modal>

        <SnackBar
          visible={this.state.openAlert}
          textMessage={this.state.alert}
          backgroundColor={"#444"}
          actionHandler={() => {
            this.setState({ openAlert: false });
          }}
          actionText="OK"
          />
      </View>
    );
  }
}

NavigatorView.cloneState = function(page) {
  if (!page || !page.props) {
    return;
  }
  var copia = page.state;
  var original = page.props;
  if (
    page.props.navigation &&
    page.props.navigation.state &&
    page.props.navigation.state.params
  ) {
    var foco = page.props.navigation.state.params;
    if (foco.oldState) {
      var old = foco.oldState;
      var list = Object.keys(old);
      for (var i = 0; i < list.length; i++) {
        var nome = list[i];
        copia[nome] = old[nome];
      }
    }
    var list = Object.keys(foco);
    for (var i = 0; i < list.length; i++) {
      var nome = list[i];
      if(nome=="oldState"){
        continue;
      }
      copia[nome] = foco[nome];
    }
  }
  if (page.props.oldState) {
    var foco = page.props.oldState;
    var list = Object.keys(foco);
    for (var i = 0; i < list.length; i++) {
      var nome = list[i];
      copia[nome] = foco[nome];
    }
  }
  if (page.props.screenProps) {
    var foco = page.props.screenProps;
    var list = Object.keys(foco);
    for (var i = 0; i < list.length; i++) {
      var nome = list[i];
      copia[nome] = foco[nome];
    }
  }

  if (copia.store && copia.store.getState) {
    var state = copia.store.getState();
    var lista = Object.keys(state);
    for (var i = 0; i < lista.length; i++) {
      var nome = lista[i];
      if(state[nome]){
        copia[nome] = state[nome];
      }
    }
  }

  var lista = Object.keys(page.props);
  for (var i = 0; i < lista.length; i++) {
    var nome = lista[i];
    copia[nome] = page.props[nome];
  }
};

NavigatorView.updateState = function(original, copia) {
  if (original && copia) {
    NavigatorView.cloneState({
      props: original,
      state: copia
    });
  }
};
