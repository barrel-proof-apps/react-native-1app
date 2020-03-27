import React, { Component } from 'react';
import  {
  StyleSheet,Animated,
  View,Image,
  TouchableOpacity,Text
} from 'react-native';

var moment = require("moment");
moment.locale("pt-br");
import DateTimePicker from 'react-native-modal-datetime-picker'

export default  class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: new Animated.Value((this.validarValue(this.props.value)||this.props.placeholder?12:15)),
      marginTop: new Animated.Value((this.validarValue(this.props.value)||this.props.placeholder?0:14)),
    };
  }

  getDate(value=this.props.init){
    // console.log(value);
    if(this.props.time == "timeOnly"){
      return   new Date( moment( moment().format("DD/MM/YYYY")+" "+(value?value:"00:00"), "DD/MM/YYYY HH:mm").toJSON());
      // return value;
    }else if(!this.props.time){
      return  new Date(moment(value).set("hour",12).toJSON());
    }
    return  new Date(value);
  }

  getDateBr(date){
    if(!date){
      return "";
    }
    date=this.getDate(date);
    var br = moment(date).utc().add(5, "hours").format("DD/MM/YYYY");
    if(this.props.time == "timeOnly"){
      br = moment(date ).format("HH:mm");
    } else if(this.props.time){
      br = moment(date ).format("DD/MM/YYYY HH:mm");
    }
    // alert(br)
    return br;
  }

  showDateTimePicker () {
    this.setState({ isDateTimePickerVisible: true })
  }

  hideDateTimePicker () {
    this.setState({ isDateTimePickerVisible: false })
  }

  handleDatePicked(date){
    var value =  moment(date).toJSON();
    var br = this.getDateBr(value);
    try {
      if(this.props.time == "timeOnly"){
        value = br;
      } else if (!this.props.time) {
        value = moment(value).set("hour",12).toJSON();
      }

      this.setState({value: value , isDateTimePickerVisible: false,br:br});

      if(this.props.onChange){
        this.props.onChange( value ,br)
      }
      if(this.props.onChangeText){
        this.props.onChange(value ,br)
      }
    } catch (e) {
      console.log(e);
      // alert(e)
    }

  }

  componentWillReceiveProps(props){
    let{fontSize,marginTop}=this.state;
    if(props.placeholder) return;
    if(this.validarValue(props.value)&&!this.validarValue(this.props.value)){
      Animated.timing(fontSize,{toValue: 12,duration: 300}).start();
      Animated.timing(marginTop,{toValue: 0,duration: 200}).start();
    }
    if(!this.validarValue(props.value)&&this.validarValue(this.props.value)){
      Animated.timing(fontSize,{toValue: 15,duration: 300}).start();
      Animated.timing(marginTop,{toValue: 14,duration: 300}).start();
    }
  }

  validarValue(v){
    return v==0||v;
  }

  render() {
    let {label='-',value,time,onChange,style,placeholder,disabled,disabledClear,datePickerModeAndroid}=this.props;
    let {fontSize,marginTop,isDateTimePickerVisible}=this.state;
    style=StyleSheet.flatten(style);
    return(
      <TouchableOpacity
        style={[styles.button,style]}
        disabled={disabled}
        onPress={()=>this.showDateTimePicker()}>
        <View style={styles.view}>
          <Animated.Text
            style={[styles.label,{marginTop,fontSize,color:style.color||styles.label.color}]}>
            {label}
          </Animated.Text>
          {placeholder &&!this.getDateBr(value)?(
            <Text
              style={[styles.value,{color:style.color||styles.value.color}]}>
              {placeholder}
            </Text>
          ):null}
          <Text
            style={[styles.value,{color:style.color||styles.value.color}]}>
            {this.getDateBr(value)}
          </Text>
        </View>
        {disabledClear&&value?(
          <TouchableOpacity onPress={() => {
              onChange( null ,null)
            } }>
            <Image
              style={{width: 20, height: 20}}
              source={{uri: icon}}
              />

          </TouchableOpacity>
        ):null}
        <DateTimePicker
          date={this.getDate(value)}
          is24Hour={true}
          datePickerModeAndroid={datePickerModeAndroid}
          mode={time == "timeOnly" ? "time" : time ? "datetime":"date" }
          isVisible={isDateTimePickerVisible}
          onConfirm={(date)=>{
            this.handleDatePicked(date);
          }}
          onCancel={()=>{
            this.hideDateTimePicker();
          }}
          />
      </TouchableOpacity>
    )
  }
}

DatePicker.defaultProps={
  label:"-",
  value:undefined,
  list:[],
  style:{},
  disabled:false,
  onChange:()=>console.log("onChange"),
  placeholder:'',
  datePickerModeAndroid:"calendar"
};

var styles = StyleSheet.create({
  button: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 0,
    borderBottomWidth:0.8,
    borderColor: "rgba(22,22,22,0.7)",
    paddingRight:5,
    marginTop:5,
  },
  view: {
    alignSelf: "stretch",
    flex:1,
    flexDirection: "column",
  },
  value: {
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    fontWeight: "normal",
    paddingTop:2
  },
  label: {
    color: "rgba(22,22,22,1)",
    alignSelf: "stretch",
    fontWeight: "normal",
    fontSize:12,
    marginBottom:2
  },
})

const icon= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIxSURBVGhD7Zg/SxxBHIbPBCSkMGiTJtjERkTszGfQIlaxsQkhjY21ILYKgmlCAlEQktLOwjIfIE1AQROEpElnoeLfFEF9n70b2MW93ZndOW8I88CDN7/dvdt3uX1drhGJRCKRSKQaj2V/AD6QlRmSh/ImAE/linwknXgif0je5EweddFjaQJtyx5pRa/8Kjnwm+Tr1W2G5R/JOU0xsOGz5AAOfMYgEOYl5/UuWZVgdj6RowwCYlZybh+TVQEz8lr+k5MMAsMqyAt5KdmRA0KkNEi6ZlcZBEphEGr2p2SHLflQutInP8mBZFXMtHzTfOlM2yC+anZD8h7fZVEYQnD/cR+OMXCkbZAvkg11a/ap3JNFYUwI9llgUIHcIL5rtiiMjxBwJ0i6ZicYeCIvjK8QkAlCzV61BmzwTTrMgfQVAjJBTM2+Z9EhCPNb8jm4JH2QCULFstiVVG8nSH+dsKzNbMkEoWJ3WgOqlwr2STrEsixrMxcyQYCqNY/Eaww8kXdj21SzLXeCAJV7LtlAFdelqJ0Isy/rhskNAi8lH04Vv2JQEZuK9RGmbRAwGy8k1VyFOcnFKKtYE+aXrPIkURgEPkh2oJqfM6jAeOtvGYQZbL50pjQIT7z3Uct1KQ0Cna5lH1gFgU7Vsi+sg4DvWvaJUxBI1zLVGgrrkiCLycoSk55afiv5P9MtuZj8lsXF5QcSfmNwwtRyKP6Vr6Uz1DJXYjMAOY8RGYlEIpFI5D+j0bgF9AZG0kiHxyMAAAAASUVORK5CYII=';
