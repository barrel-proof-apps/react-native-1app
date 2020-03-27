import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import ImagePicker from 'react-native-image-picker';

let host=null;
let confg={};
let metodo="/imageMake";
let token_api=null;

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false
    };
  }

  upLoad(retorno) {
    pegarFoto( base64 => {
    if(!base64) return;
      this.setState({ load: true });
      upLoad(base64,retorno,this.props)
    },this.props);
  }




  render() {
    let{value,label,onChange,style,styleImage,resizeMode,body}=this.props;
    value=value?value:'';
    return (
      <TouchableOpacity
        style={[style,styles.button ]}
        disabled={this.state.load}
        onPress={() => {
          this.upLoad((url,data={}) => {
            this.setState({ load: false });
            onChange(url,data);
          });
        }}
        >
        <Image
          style={[styles.image, style,styleImage]}
          // resizeMode={resizeMode}
          onLoadStart={(e) => this.setState({load: true})}
          onLoadEnd={(e) => this.setState({load: false})}
          source={{ uri: value }}
          />
        <View  style={styles.body}>
          {this.state.load&&
            <View  style={styles.load}>
              <ActivityIndicator
                style={{height: 80}}
                size="large"
                />
            </View>
          }
          {!body&&!this.state.load&&
            <View  style={styles.containText}>
              {!value&&
                <Text  style={styles.add}>
                  {"+"}
                </Text>
              }
              {label &&
                <Text  style={styles.label}>
                  {label}
                </Text>
              }

              <Text  style={styles.text}>
                {value ? "alterar" : "adicionar"}
              </Text>
            </View>
          }
          {!this.state.load&&body}
        </View>
      </TouchableOpacity>
    );
  }
}

ImageUpload.defaultProps={
  value:'',
  label:null,
  onChange:()=>console.log("not onChange"),
  style:{},
  styleImage:{},
  resizeMode:"cover",
  body:null,
  onResposta:(res,error)=>({result:res,error})
};

var styles = StyleSheet.create(
  {
    body:{
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: "absolute",
      justifyContent: "center", alignItems: "center"
    },
    image:{
      flex: 1,
      alignSelf: "stretch"
    },
    button:{
      justifyContent: "center",
      alignItems: "center"
    },
    load:{
      height:60,
      width:60,
      borderRadius:30,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center"
    },
    containText:{
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: 10,
      borderRadius: 5,
      marginBottom:5,
      justifyContent: "center",
      alignItems: "center"
    },
    label:{
      alignSelf: "stretch",
      textAlign: "center",
      fontSize: 12,
      fontWeight: "800",
      color: "#ffffff",
    },
    text:{
      alignSelf: "stretch",
      textAlign: "center",
      fontSize: 11,
      fontWeight: "800",
      color: "#ffffff",
    },
    add:{
      fontSize: 30,
      fontWeight: "bold",
      color: "#ffffff",
    },
    containAdd:{
      height:50,
      width:50,
      borderRadius:25,
      backgroundColor: "rgba(235,235,235,0.6)",
      justifyContent: "center",
      alignItems: "center",
      margin:10
    },
  }
);

 function pegarFoto(retorno,prop={}) {
  if(!host) return alert('Configure o caminho de upLoad! ( ImageUpload.setHost(host) )');
  var rem = {"Remover imagem": "remover"};

  var options = {
    title: "Selecione uma imagem",
    videoQuality: "medium", // 'low', 'medium', or 'high'
    durationLimit: 30, // video recording max time in seconds
    maxWidth: parseInt(prop.maxWidth) || 500, // photos only
    maxHeight: parseInt(prop.maxHeight) || 750, // photos only
    quality: 1, // 0 to 1, photos only
    customButtons: [
    ],
    chooseFromLibraryButtonTitle: "Pegar no telefone",
    cancelButtonTitle: "Cancelar",
    takePhotoButtonTitle: "Tirar foto", // specify null or empty string to remove this button
    storageOptions: {
      skipBackup: true,
      path: "images"
    }
  };
  ImagePicker.showImagePicker(options, response => {
    if (response.error) {
      console.log("ImagePickerManager Error: ", response.error);
      retorno(null);
    } else if (response.customButton) {
      retorno(null);
    } else {
      retorno(response.data);
    }
  });
}

 function resolverResponse(response, retorno) {
  var p1 = response.json();
  p1.then((responseData, error) => {
    if (response.status != 200) {
      retorno(undefined, responseData);
    } else if (error) {
      retorno(undefined, error);
    } else {
      retorno(responseData);
    }
  });
}
function upLoad(base64,retorno,prop={}) {
    var url = host + metodo;
    if (!base64)return console.log("base64 null no salvarImagem");
    var send = { data: base64, nome: "up.jpg" };
    var config = {
      method: "POST",
      headers: {
        "x-request-id":token_api,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      ...confg,
      body: JSON.stringify(send)
    };
    let {onResposta}=prop
    fetch(url, config)
    .then(response => {
      resolverResponse(response, (res,er)=>{
        let{result,error}=onResposta(res,er);
        if (retorno) {
          retorno(result.url_img,result);
        }

      });
    })
    .catch(error => {
      alert(error)
      console.log(error);
    });
}
ImageUpload.upLoad =upLoad;
ImageUpload.pegarFoto =pegarFoto;

ImageUpload.setHost = function(url='') {
  host = url; //.replace("/v1","");
};
ImageUpload.setToken = function(token='') {
  token_api = token;
};
ImageUpload.setConfigCloud = function(cf={}) {
  confg = cf;
};
ImageUpload.setMetodo = function(m='') {
  metodo = m;
};
