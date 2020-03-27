'use strict';
import  {
  Alert,
  Platform,AppState,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';
import SnackBar from "react-native-snackbar-component";

import Fragment from './lib/fragment';
import TextInput from './lib/TextInput';
import InputText from './lib/TextInput';
import DrawerLayout from './lib/DrawerLayout'
import FlashMessage,{showMessage} from './lib/FlashMessage'
import InitApp from './lib/InitApp';
import {openDialog,closeDialog} from './lib/DialogAlert';
import {openModal,closeModal} from './lib/PgModal';

import RefreshControl from "./lib/RefreshControl"
import Progress  from './lib/Progresso';
import TouchableOpacity  from './lib/TouchableOpacity';
import View  from './lib/View';
import Switch  from './lib/Switch';
import MapView  from './lib/MapView';
import PhotosUpload  from './lib/FotosUpload';
import PhotosArray  from './lib/FotosArray';
import FotosGrid  from './lib/FotosGrid';
import SwitchSelector  from './lib/SwitchSelector';

const Map = ({data=[],renderItem})=>{
  return data.map((item,index)=>(renderItem({item,index})))
}

import Icon  from './lib/Icon';
import Text from './lib/Text';
import TitleBar from './lib/TitleBar';
import Image from './lib/Image';
import ListView from './lib/ListView';
import ScrollView from './lib/ScrollView';
import Photos from './lib/Fotos';
import GridView from './lib/GridView';
import SelectInput from './lib/SelectInput';
import TabView from './lib/TabView';
// import QRCode from 'react-native-qrcode';
import QRCode from './lib/QRCode';
import DatePicker from './lib/DatePicker';
import TimePicker from './lib/TimePicker';
import SwipeList from './lib/SwipeList';


import Content from './lib/Content';
import ImageUpload from './lib/ImageUpload';
import Modal from './lib/Modal';


var moment = require("moment");
let ola='ola'
const OpenSnack=(...p)=>{
  showMessage(...p);
}
const OpenModal=(...p)=>{
  openModal(...p);
}

export {
  PhotosUpload,
  Modal,
  OpenSnack,
  OpenModal,
  PhotosArray,
  Map,
  MapView,
  SnackBar,
  ImageUpload,
  DatePicker,
  TimePicker,
  Content,
  QRCode,
  TabView,
  StyleSheet,
  Fragment,
  RefreshControl,
  Icon,
  GridView,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  InputText,
  TitleBar,
  Progress,
  Photos,
  SelectInput,
  Image,
  Text,
  ListView,
  Alert,
  Switch,
  View,
  DrawerLayout,
  moment,
  SwipeList,
  ola,
  FlashMessage,
  InitApp,
  openDialog,
  closeDialog,
  SwitchSelector,
  openModal,
  closeModal,
  FotosGrid,
  showMessage
}
