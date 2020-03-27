'use strict';
var React = require('react-native');

var {
  LinkingIOS,Linking,
  IntentAndroid,
  Platform,
} = React;

// const FBSDK = require('react-native-fbsdk');
// const { LoginManager,AccessToken} = FBSDK;

module.exports = {

  loginFacebook(callback){
    LoginManager.logInWithReadPermissions(['public_profile',"email","user_friends"]).then( (result) =>{
      console.log(result);
      if (result.isCancelled) {
        callback(null);
      } else {
        AccessToken.getCurrentAccessToken().then((accessToken) => {
          callback(accessToken.accessToken);
        });
      }
    }, (error) =>{
      console.log(error);
      callback(null);
    });
  },

  removerAcentos(s) {
    if(!s){
      return "";
    }
    var r = s.toLowerCase();
    r = r.replace(new RegExp(/\s/g), "_");
    r = r.replace(new RegExp(/[àáâãäå]/g), "a");
    r = r.replace(new RegExp(/æ/g), "ae");
    r = r.replace(new RegExp(/ç/g), "c");
    r = r.replace(new RegExp(/[èéêë]/g), "e");
    r = r.replace(new RegExp(/[ìíîï]/g), "i");
    r = r.replace(new RegExp(/ñ/g), "n");
    r = r.replace(new RegExp(/[òóôõö]/g), "o");
    r = r.replace(new RegExp(/œ/g), "oe");
    r = r.replace(new RegExp(/[ùúûü]/g), "u");
    r = r.replace(new RegExp(/[ýÿ]/g), "y");
    r = r.replace(new RegExp(/\W/g), "");
    return r;
  },
  parseNumeroDuasCasas (string) {
    if(!string){
      return 0.00;
    }
    try {
      string = string + "";
      var val = string.replace(',', '.');
      var nnn = parseFloat(val);
      if(!nnn){
        nnn = 0.00;
      }
      var num = nnn.toFixed(2);
      //        return parseFloat(val);
      if(!num || num < 0){
        num = 0.00;
      }
      return num;
    } catch (e) {
      console.log(e);
      return 0.00;
    }
  },
  parseNumeroIntero (string) {
    if(!string){
      return 0;
    }
    try {
      string = string + "";
      var val = string.replace(',', '.');
      var nnn = parseInt(val);
      if(!nnn){
        nnn = 0;
      }
      return nnn;
    } catch (e) {
      console.log(e);
      return 0;
    }
  },
  parseNumeroBR (string) {
    try {
      string = string + "";
      var val = string.replace(',', '.');
      var nnn = parseFloat(val);
      var num = nnn.toFixed(2);
      //        return parseFloat(val);
      // var val = (num+"").replace(".", ',');
      return this.parseReal(num);
    } catch (e) {
      return "0,00";
    }
  },
  parseReal(value){
    if(!value){
      return "0,00";
    }
    value = value+"";
    return  value.replace(".",",");
  },
  parseMoney(value){
    value = this.parseNumeroDuasCasas(value);
    if(!value){
      return "R$ 0,00";
    }
    value = value+"";
    return  "R$"+value.replace(".",",");
  },
  getKeyChat(key_origem,key_destino){
    if(!key_origem || !key_destino){
      return "";
    }
    key_origem = key_origem+"";
    if(key_origem.localeCompare(key_destino+"")>0){
      return key_origem+"_"+key_destino;
    }else{
      return key_destino+"_"+key_origem;
    }
  },
  humanizarDistancia(metros){
    if(metros < 50){
      return "aqui";
    }else if(metros < 1000){
      return parseInt(metros+"")+" mts";
    }else {
      return parseInt((metros/1000)+"")+" Kms";
    }
  },
  distLatLongEmMt(lat1,lon1,lat2,lon2) {
    lat1 = Number(lat1);
    lon1 = Number(lon1);
    lat2 = Number(lat2);
    lon2 = Number(lon2);
    function deg2rad(deg) {
      return deg * (Math.PI / 180)
    }
    var R = 6371; // Radius of the earth in kilometers
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in KM
    // console.log(d);
    // console.log(lat1,lat2,lon1,lon2);
    return (d*1000);
  },

  getPartLocation(tag,json){
    var lista = json.results[0].address_components;
    for (var i = 0; i < lista.length; i++) {
      var item = lista[i];
      if(item.types.indexOf(tag)>=0){
        return item.long_name;
      }
    }
  },
  geoLocalizacao(endereco, retorno){
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    + encodeURI(endereco)
    + '&sensor=true&key=AIzaSyAdBVSO_pMhwOzOvCKtvWPpjVRyFJlh4yI';
    console.log(url);
    this.getRequest(url,(json)=>{
      if (json.results && json.results[0] && json.results[0].geometry) {
        var address = {};
        if(json.results[0].address_components ){
          address.numero = this.getPartLocation("street_number",json);
          address.rua = this.getPartLocation("route",json);
          address.bairro = this.getPartLocation("sublocality",json);
          address.cidade = this.getPartLocation("administrative_area_level_2",json);
          address.estado = this.getPartLocation("administrative_area_level_1",json);
          address.pais = this.getPartLocation("country",json);
          address.cep = this.getPartLocation("postal_code",json);
        }
        address.endereco = json.results[0].formatted_address;

        var geometry = json.results[0].geometry;
        if (geometry && geometry.location) {
          retorno(geometry.location.lat, geometry.location.lng,address);
        } else {
          retorno(0, 0);
        }
      } else {
        retorno(0, 0);
      }
    });
  },
  getRequest(url,retorno,backErro){
    fetch(url).then((response) => response.text()) .then((responseData) => {
      // retorno(responseData);
      // fetch(url).then((responseData) => {
      try {
        responseData = JSON.parse(responseData);
      } catch (e) {
        console.log("volta:"+url);
        console.log(responseData);
        responseData = {};
      }
      retorno(responseData);
    }).catch((error) => {
      console.log(error);
      if (backErro) {
        backErro(error);
      }
    }).done();
  },
  getRequestData(url,retorno,backErro){
    fetch(url).then((responseData) => {
      retorno(responseData);
    }).catch((error) => {
      console.log(error);
      if (backErro) {
        backErro(error);
      }
    }).done();
  },
  postRequest(url,data,retorno,backErro){
    console.log(url);
    var config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
    // console.log(config);
    fetch(url, config).then((response) => response.text()) .then((responseData) => {
      // fetch(url, config).then((responseData) => {
      try {
        responseData = JSON.parse(responseData);
      } catch (e) {
        console.log("volta :"+url);
        console.log(responseData);
        responseData = {};
      }
      // console.log(responseData);
      retorno(responseData);
    }).catch((error) => {
      console.log("Erro http :"+url);
      console.log(config);
      console.log(error);
      if (backErro) {
        backErro(error);
      }
    }).done();
  },
  postRequestHeaders(url,data,headers,retorno,backErro){
    fetch(url, {
      method: 'POST',
      headers:headers,
      body: JSON.stringify(data)
    }).then((response) => response.text()) .then((responseData) => {
      // fetch(url, config).then((responseData) => {
      try {
        responseData = JSON.parse(responseData);
      } catch (e) {
        console.log("volta :"+url);
        console.log(responseData);
        responseData = {};
      }
      // console.log(responseData);
      retorno(responseData);
    }).catch((error) => {
      console.log(error);
      if (backErro) {
        backErro(error);
      }
    }).done();
  },
  allRequest(url,data,headers,metodo,retorno,backErro){
    fetch(url, {
      method: metodo,
      headers:headers,
      body: JSON.stringify(data)
    }).then((response) => response.text()) .then((responseData) => {
      // fetch(url, config).then((responseData) => {
      try {
        responseData = JSON.parse(responseData);
      } catch (e) {
        console.log("volta :"+url);
        console.log(responseData);
        responseData = {};
      }
      // console.log(responseData);
      retorno(responseData);
    }).catch((error) => {
      console.log(error);
      if (backErro) {
        backErro(error);
      }
    }).done();
  },
  replaceAll (string, str, key) {
    try {
      if (!string) {
        return "";
      }
      if (!str) {
        return string;
      }
      if (!key) {
        key = "";
      }
      return string.replace(new RegExp(str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), key);
    } catch (e) {
      return string;
    }
  },
  recortaString(string,pos){
    if (!string ) {
      return "";
    }
    if(!pos){
      return string;
    }
    var re = "";
    // if (contemString(string, "#")) {
    //   var numero = string.split("#")[1];
    var pos =parseInt(pos+"");
    if ( pos < string.length-1) {
      re = string.substring(0,pos)+"...";
    }else{
      re= string
    }
    // }
    return re;
  },
  contemString(string, key) {
    if (!string || !key) {
      return false;
    }
    try {
      string = string+"";
      if (string && string.indexOf(key) >= 0) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  },
  startsWith (string, key) {
    if(string){
      string = string+"";
    }else{
      return false;
    }
    if (string && string.indexOf(key) === 0) {
      return true;
    } else {
      return false;
    }
  },
  endWith (string, key) {
    if(string){
      string = string+"";
    }else{
      return false;
    }
    if (string && string.indexOf(key, string.length - key.length) === 0) {
      return true;
    } else {
      return false;
    }
  },

  phonecall(phoneNumber, prompt) {
    if(arguments.length !== 2) {
      console.log('you must supply exactly 2 arguments');
      return;
    }

    if(!isCorrectType('String', phoneNumber)) {
      console.log('the phone number must be provided as a String value');
      return;
    }

    if(!isCorrectType('Boolean', prompt)) {
      console.log('the prompt parameter must be a Boolean');
      return;
    }

    var url;

    if(Platform.OS !== 'android') {
      url = prompt ? 'telprompt:' : 'tel:';
    }
    else {
      url = 'tel:';
    }

    url += phoneNumber;

    LaunchURL(url);
  },

  email(to, cc, bcc, subject, body){
    var url = 'mailto:';
    var argLength = arguments.length;

    switch(argLength) {
      case 0:
      LaunchURL(url);
      return;
      case 5:
      break;
      default:
      console.log('you must supply either 0 or 5 arguments. You supplied ' + argLength);
      return;
    }

    // we use this Boolean to keep track of when we add a new parameter to the querystring
    // it helps us know when we need to add & to separate parameters
    var valueAdded = false;

    if(isCorrectType('Array', arguments[0])) {
      var validAddresses = getValidArgumentsFromArray(arguments[0], 'String');

      if(validAddresses.length > 0) {
        url += validAddresses.join(',');
      }
    }

    url += '?';

    if(isCorrectType('Array', arguments[1])) {
      var validAddresses = getValidArgumentsFromArray(arguments[1], 'String');

      if(validAddresses.length > 0) {
        valueAdded = true;
        url += 'cc=' + validAddresses.join(',');
      }
    }

    if(isCorrectType('Array', arguments[2])) {
      if(valueAdded) {
        url += '&';
      }

      var validAddresses = getValidArgumentsFromArray(arguments[2], 'String');

      if(validAddresses.length > 0) {
        valueAdded = true;
        url += 'bcc=' + validAddresses.join(',');
      }
    }

    if(isCorrectType('String', arguments[3])) {
      if(valueAdded) {
        url += '&';
      }

      valueAdded = true;
      url += 'subject=' + arguments[3];
    }

    if(isCorrectType('String', arguments[4])) {
      if(valueAdded) {
        url += '&';
      }

      url += 'body=' + arguments[4];
    }

    url = encodeURI(url);

    LaunchURL(url);
  },

  text(phoneNumber) {
    if(arguments.length > 1) {
      console.log('you supplied too many arguments. You can either supply 0 or 1');
      return;
    }

    var url = 'sms:';

    if(arguments.length !== 0) {
      if(isCorrectType('String', phoneNumber)) {
        url += phoneNumber;
      } else {
        console.log('the phone number should be provided as a string. It was provided as '
        + Object.prototype.toString.call(phoneNumber).slice(8, -1)
        + ',ignoring the value provided');
      }
    }

    LaunchURL(url);
  },
  web(address) {
    if (!this.startsWith(address,"http")) {
      address ="http://"+address;
    }
    Linking.canOpenURL(address).then(supported => {
      if (supported) {
        Linking.openURL(address);
      } else {
        console.log('Don\'t know how to open URI: ' + address);
      }
    });
    // if(!address) {
    //   console.log('Missing address argument');
    //   return;
    // }
    // if (!this.startsWith(address,"http")) {
    //   address ="http://"+address;
    // }
    // if(!isCorrectType('String', address)) {
    //   console.log('address was not provided as a string, it was provided as '
    //   + Object.prototype.toString.call(address).slice(8, -1));
    //   return;
    // }
    // LaunchURL(address);
  },

  /////YOUTUBE
  getRequestDataText(url,retorno,backErro){
    fetch(url).then((response) => response.text()) .then((responseData) => {
      retorno(responseData);
    }).catch((error) => {
      console.log(error);
      if (backErro) {
        backErro(error);
      }
    }).done();
  },
    getYouTube(url, retorno){
    console.log(url);
    //https://www.youtube.com/watch?v=RxWtvbvc_kw
    if (this.contemString(url,".mp4")) {
      retorno({url:url});
      return;
    }
    var id =  this.replaceAll(url,"https://www.youtube.com/watch?v=","");//RxWtvbvc_kw
    id =  this.replaceAll(id,"http://www.youtube.com/watch?v=","");
    id =  this.replaceAll(id,"http://youtube.com/watch?v=","");
    id =  this.replaceAll(id,"https://youtube.com/watch?v=","");
    id =  this.replaceAll(id,"https://m.youtube.com/watch?v=","");
    id =  this.replaceAll(id,"https://youtu.be/","");
    if (this.contemString(url,"&")) {
      id = id.split("&")[0];
    }


    console.log(id);
    if(!id){
      retorno({url:null,image:""});
      return;
    }
    this.getRequestDataText("http://www.youtube.com/get_video_info?video_id="+id,(res)=>{
      //console.log(res);
      let video_info = res;

      let video = this.decodeQueryString(video_info);
      if(video && video.hlsvp){
        retorno({url:video.hlsvp,image:""});
        return ;
      }
      if (video.status === "fail") {
        retorno(video);
      }
      video.sources = this.decodeStreamMap(video.url_encoded_fmt_stream_map);
      // console.log(video.sources);
      var url = this.getSource(video.sources,"video/mp4","medium");
      var dados ={url:url, image:video.iurlhq};
      //console.log(dados);
      retorno(dados);
    },(e)=>{
      console.log(e);
    });
  },



  decodeQueryString (queryString) {
    if(!queryString){
      return {};
    }
    var key, keyValPair, keyValPairs, r, val, _i, _len;
    r = {};
    keyValPairs = queryString.split("&");
    for (_i = 0, _len = keyValPairs.length; _i < _len; _i++) {
      keyValPair = keyValPairs[_i];
      key = decodeURIComponent(keyValPair.split("=")[0]);
      val = decodeURIComponent(keyValPair.split("=")[1] || "");
      r[key] = val;
    }
    return r;
  },
  decodeStreamMap(url_encoded_fmt_stream_map) {
    if(!url_encoded_fmt_stream_map){
      return {};
    }
    var quality, sources, stream, type, urlEncodedStream, _i, _len, _ref;
    sources = {};
    _ref = url_encoded_fmt_stream_map.split(",");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      urlEncodedStream = _ref[_i];
      stream = this.decodeQueryString(urlEncodedStream);
      type = stream.type.split(";")[0];
      quality = stream.quality.split(",")[0];
      stream.original_url = stream.url;
      stream.url = "" + stream.url + "&signature=" + stream.sig;
      sources["" + type + " " + quality] = stream;
    }
    return sources;
  },

  getSource(source,type, quality){
    var exact, key, lowest, source, _ref;
    lowest = null;
    exact = null;
    _ref = source;
    // console.log(source);
    for (key in _ref) {
      source = _ref[key];
      // console.log(source);
      if (source.type.match(type)) {
        if (source.quality.match(quality)) {
          exact = source.url;
        } else {
          lowest = source.url;
        }
      }
    }
    return exact || lowest;
  },
  //////YOUTUBE


};

var LaunchURL = function(url) {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log('Don\'t know how to open URI: ' + url);
    }
  });
  // var Linker = Platform.OS === 'android' ? IntentAndroid : Linking;
  // // Linker.canOpenURL(url, (supported) => {
  // //   if (!supported) {
  // //     console.log('Can\'t handle url: ' + url);
  // //   } else {
  // //     Linker.openURL(url);
  // //   }
  // // });
  // // Linker.openURL(url);
  // if (!Linker.canOpenURL(url)) {
  //   console.log('Can\'t handle url: ' + url);
  // } else {
  //   Linker.openURL(url);
  // }
};

var getValidArgumentsFromArray = function(array, type) {
  var validValues = [];
  array.forEach(function(value) {
    if(isCorrectType(type, value)) {
      validValues.push(value);
    }
  });

  return validValues;
};

var isCorrectType = function(expected, actual) {
  return Object.prototype.toString.call(actual).slice(8, -1) === expected;
};
// module.exports = communication;
