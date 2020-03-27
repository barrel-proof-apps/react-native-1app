import React from "react";
import FlashMessage from "./FlashMessage";
import PgModal from "./PgModal"
import DialogAlert from "./DialogAlert"



export default function InitApp(props) {
    return[
      <DialogAlert {...props} key="alerta_custom"/>,
      <PgModal {...props} key="modal_custom"/>,
      <FlashMessage position={props.position||"bottom"} key="notificacao_custom"/>
    ]
  }
