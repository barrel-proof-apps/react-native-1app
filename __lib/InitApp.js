import React from "react";
import FlashMessage from "./FlashMessage";
import PgModal from "./PgModal"
import DialogAlert from "./DialogAlert"



export default class InitApp extends React.Component {
  constructor(props) {
    super(props);
    _ref=this;
    this.state={

    }
  }

  render() {

    return[
      <DialogAlert {...this.props} key="alerta_custom"/>,
      <PgModal {...this.props} key="modal_custom"/>,
      <FlashMessage position="top" key="notificacao_custom" ref="myLocalFlashMessage" style={{paddingTop:35}}/>
    ]
  }
}
