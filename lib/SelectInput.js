import React from "react";
import {
  StyleSheet,
  Text,
  Animated,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView
} from "react-native";
import TextInput from "./TextInput";
import { openDialog, closeDialog } from "./DialogAlert";

import { Menu, MenuItem } from "./Menu";

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: new Animated.Value(
        this.props.value || this.props.placeholder ? 12 : 15
      ),
      marginTop: new Animated.Value(
        this.props.value || this.props.placeholder ? 0 : 14
      )
    };
  }
  openSelect() {
    let { title, onChange, clearDisabled } = this.props;
    let actions = !clearDisabled
      ? [{ title: "LIMPAR", onPress: () => onChange(undefined, {}) }]
      : [];
    openDialog({
      body: <SelectOpen {...this.props} />,
      title,
      align: "top",
      actions: [{ title: "OK" }, ...actions],
      styleDescricao: { margin: 0 }
    });
  }
  componentWillReceiveProps(props) {
    let { fontSize, marginTop } = this.state;
    if (props.placeholder) return;

    if (
      this.validarValue(props.value) &&
      !this.validarValue(this.props.value)
    ) {
      Animated.timing(fontSize, { toValue: 12, duration: 500 }).start();
      Animated.timing(marginTop, { toValue: 0, duration: 200 }).start();
    }
    if (
      !this.validarValue(props.value) &&
      this.validarValue(this.props.value)
    ) {
      Animated.timing(fontSize, { toValue: 15, duration: 500 }).start();
      Animated.timing(marginTop, { toValue: 14, duration: 500 }).start();
    }
  }
  validarValue(v) {
    return v == 0 || v;
  }

  render() {
    let {
      list,
      label,
      value,
      key_value,
      key_label,
      style,
      disabled,
      type,
      placeholder,
      inputNative,
      notIcon,
      renderSelect
    } = this.props;
    let { fontSize, marginTop } = this.state;
    let item = list.find(i => i[key_value] == value);
    style = StyleSheet.flatten(style);
    let textAlign = style.textAlign || "left";
    return (
      <TouchableOpacity
        style={[
          styles.button,
          { borderColor: style.color || styles.value.color },
          style
        ]}
        disabled={disabled}
        onPress={() => {
          if (type == "menu") {
            this._menu.showMenu();
          } else {
            this.openSelect();
          }
        }}
      >
        <View style={styles.view}>
          {!inputNative ? (
            <Animated.Text
              style={[
                styles.label,
                {
                  textAlign,
                  marginTop,
                  fontSize,
                  color: style.color || styles.label.color
                }
              ]}
            >
              {label}
            </Animated.Text>
          ) : null}
          {item && item[key_label] ? (
            renderSelect ? (
              renderSelect(item, item[key_label], key_label)
            ) : (
              <Text
                style={[
                  styles.value,
                  {
                    textAlign,
                    color: style.color || styles.label.color,
                    fontSize: style.fontSize || styles.label.fontSize
                  }
                ]}
              >
                {item[key_label]}
              </Text>
            )
          ) : null}
          {placeholder && (!item || !item[key_label]) ? (
            <Text
              style={[
                styles.value,
                {
                  textAlign,
                  color: style.color || styles.value.color,
                  fontSize: style.fontSize || styles.label.fontSize
                }
              ]}
            >
              {placeholder}
            </Text>
          ) : null}
          {type == "menu" ? (
            <SelectMenu
              {...this.props}
              ref={ref => {
                this._menu = ref;
              }}
            />
          ) : null}
        </View>
        {!notIcon&&!disabled ? (
          <Image
            style={{
              width: 15,
              height: 15,
              tintColor: style.color || styles.value.color
            }}
            source={{ uri: icon_abrir }}
          />
        ) : null}
      </TouchableOpacity>
    );
  }
}

class SelectMenu extends React.Component {
  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    let {
      key_label,
      list,
      onChange,
      key_value,
      value,
      renderItem
    } = this.props;
    return (
      <Menu
        ref={this.setMenuRef}
        button={<View style={{ alignSelf: "stretch" }} />}
      >
        {list.map((item, i) => {
          if (renderItem)
            return (
              <TouchableOpacity
                onPress={() => {
                  this.hideMenu();
                  onChange(item[key_value], item, i);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 5
                }}
              >
                {renderItem(item, i)}
              </TouchableOpacity>
            );
          return (
            <MenuItem
              onPress={() => {
                this.hideMenu();
                onChange(item[key_value], item, i);
              }}
            >
              {item[key_label]}
            </MenuItem>
          );
        })}
      </Menu>
    );
  }
}

class SelectOpen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: ""
    };
  }
  getSuggestions() {
    let { key_label, list } = this.props;
    let { texto } = this.state;

    if (texto === "" || !texto) return list;

    return list.filter(
      item =>
        this.limparString(item[key_label]).indexOf(this.limparString(texto)) >=
        0
    );
  }
  limparString(s) {
    return s
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .toLowerCase();
  }
  render() {
    let {
      key_label,
      list,
      key_sub_label,
      onChange,
      key_value,
      value,
      renderItem
    } = this.props;
    return (
      <View style={styles.view}>
        {list.length > 9 && (
          <View style={styles.contenerInput}>
            <TextInput
              style={styles.textinput}
              value={this.state.texto}
              placeholder="Filtrar"
              onChange={texto => {
                this.setState({ texto });
              }}
              inputNative={true}
            />
          </View>
        )}
        {this.getSuggestions().map((item, i) => (
          <TouchableOpacity
            key={"item" + i}
            style={styles.buttonItem}
            onPress={() => {
              onChange(item[key_value], item, i);
              closeDialog();
            }}
          >
            {(renderItem && renderItem(item, i)) || [
              <View style={styles.viewItem}>
                <Text style={styles.valueItem}>{item[key_label]}</Text>
                {item[key_sub_label] && (
                  <Text style={styles.label}>{item[key_sub_label]}</Text>
                )}
              </View>,
              <Image
                style={{ width: 20, height: 20 }}
                source={{
                  uri: item[key_value] == value ? icon_check : icon_not_check
                }}
              />
            ]}
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

Select.defaultProps = {
  label: "-",
  value: undefined,
  list: [],
  key_value: "value",
  key_label: "text",
  style: {},
  disabled: false,
  type: "modal",
  onChange: () => console.log("onChange"),
  title: "Select",
  placeholder: "",
  inputNative: false,
  notIcon: false
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
    borderBottomWidth: 0.8,
    borderColor: "rgba(22,22,22,0.7)",
    marginTop: 10,
    paddingRight: 5
  },
  buttonItem: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    flexDirection: "row",
    padding: 2,
    borderStyle: "solid",
    borderWidth: 0,
    borderTopWidth: 1,
    borderColor: "rgba(187,177,177,0.53)",
    paddingLeft: 10,
    paddingRight: 10
  },
  view: {
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "column",
    padding: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  viewItem: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 2
  },
  value: {
    color: "rgba(0,0,0,1)",
    fontWeight: "normal",
    alignSelf: "stretch"
    // paddingTop:2
  },
  valueItem: {
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    fontWeight: "normal"
    // paddingTop:2
  },
  label: {
    color: "rgba(22,22,22,1)",
    alignSelf: "stretch",
    fontWeight: "normal",
    fontSize: 12,
    marginBottom: 2
  },
  textinput: {
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    textAlign: "left",
    fontWeight: "normal",
    height: 35
  },
  contenerInput: {
    backgroundColor: "rgba(255,255,255,1)",
    padding: 5,
    margin: 3,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: "stretch",
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
});

const icon_limpar =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIxSURBVGhD7Zg/SxxBHIbPBCSkMGiTJtjERkTszGfQIlaxsQkhjY21ILYKgmlCAlEQktLOwjIfIE1AQROEpElnoeLfFEF9n70b2MW93ZndOW8I88CDN7/dvdt3uX1drhGJRCKRSKQaj2V/AD6QlRmSh/ImAE/linwknXgif0je5EweddFjaQJtyx5pRa/8Kjnwm+Tr1W2G5R/JOU0xsOGz5AAOfMYgEOYl5/UuWZVgdj6RowwCYlZybh+TVQEz8lr+k5MMAsMqyAt5KdmRA0KkNEi6ZlcZBEphEGr2p2SHLflQutInP8mBZFXMtHzTfOlM2yC+anZD8h7fZVEYQnD/cR+OMXCkbZAvkg11a/ap3JNFYUwI9llgUIHcIL5rtiiMjxBwJ0i6ZicYeCIvjK8QkAlCzV61BmzwTTrMgfQVAjJBTM2+Z9EhCPNb8jm4JH2QCULFstiVVG8nSH+dsKzNbMkEoWJ3WgOqlwr2STrEsixrMxcyQYCqNY/Eaww8kXdj21SzLXeCAJV7LtlAFdelqJ0Isy/rhskNAi8lH04Vv2JQEZuK9RGmbRAwGy8k1VyFOcnFKKtYE+aXrPIkURgEPkh2oJqfM6jAeOtvGYQZbL50pjQIT7z3Uct1KQ0Cna5lH1gFgU7Vsi+sg4DvWvaJUxBI1zLVGgrrkiCLycoSk55afiv5P9MtuZj8lsXF5QcSfmNwwtRyKP6Vr6Uz1DJXYjMAOY8RGYlEIpFI5D+j0bgF9AZG0kiHxyMAAAAASUVORK5CYII=";

const icon_abrir =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFBSURBVGhD7dcxKEVRHMfxKzEYeCUmC0oZXjYmZVE22Ty7UdksNoNRGZVN2ZRJWZSJTQalbCZKj8FAwvc/KOkf99137r3n5vetz3KHc/5nOucmSimllFJKKRVRwxiJXD/+bAUfEbvFKFK1Bm+Rst1jHC21AW+xsjQxgUxtwVu0aE+YQuY6sANv8aI8YwZt14k9eJvk7QVzCJYd5gDeZnl5wwKC140jeJuGZodYQm714ATe5qG8Yxm514szeEOEsIrCquEC3iDtWEfhDeAK3kBZbKK0hnADb7BWbKP07LVsDzlvwDR2YRdvFI3hDt6gv9mH3VFRVccDvIE9h+hClE3iEd7g3x3DLtiom4Y99LwDmFPYxVqJZmEPvp+HOEcfKtU8XvF1iEuk+teOsUXYA/Aag/ahyjVgF6dSSiml1P8qST4BgcHE7LLrfy0AAAAASUVORK5CYII=";

const icon_check =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJCSURBVGhD7dm/zwxBHMfxQygoaGj8SAhRoJGgEYlEKf4B/gBEJREVJZ2CBL1fiUKl0CjQqBQSPwoKJIQoECFC8H4nd8nm8r2b3Xt296aYT/Jq5mZ3n+/tMzsze4OSkpIFZRMu4TV+41/PvuMhjmEZZspx/EJ0gXl4hi1oFL+B6GTz9h7rUCsbkdOdGHcXtXIR0Qlysg3JOLCjg3NyGlOzGPN4OjV1FVOzEtGBubmBqSmF9KwU0pev+DHWFsm6kD84iN34MGybJOtCTsCsxjtEfUayLeQyzHI8RtSnKstC7mEJFuHWsC0lu0Kewmuac4j6RLIq5BNcaZvD+IuoXySbQn5iD8xeNN02tFqIz/yoPcVv3jtgNsM7E/WbprVC3mI9LlTa6joL47WeI+qT0loh1+CTxpxB1CdyHT6dluL+sG0Wrf5r3cTozYaTWWqwOj+M+jtvRH3qan2wu392EjNHMGlT9grO2OYkoj5NtF6IHsDjzCH4RKp+/gU7YPzcNVX181l0UoieYA3MfnyD7f7RB2Asxhdu48fOorNC9BIbYHbhM3w/ZtYitRBsotNC9AZbYUZjou5CsInOC9FH7ITxUXsHUb+F6KUQOcD34XylrU29FaIuX7v2WkiXSiG5SRayAtGBuXHRmkxbs2+X3D4k8wjRwTlxgZrMUUQH58Kd6Sok457hBaKT5OAUase9tD88RieaJwe5y55G8ddTN07RCfvmksc70biIarbD3+yu4HaPnCt8Ojmwa42JkpKSSRkM/gM5mlZVH7Nq9gAAAABJRU5ErkJggg==";

const icon_not_check =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFnSURBVGhD7dm/LgRRGIbxjQKJQqhoaDQU7kYkhAsQiZKKO9AJatFwARJKboKCFhHxr6Lg+YqTfJlM5syss2emeJ/kl2jO7Pl2Zleyp6eU+ldzOMADfvCb2RdusIlh9NUWvlH2Am24wzwaZUOUXaxtz5hBrexxKrsT9mi9ZvSO4h7MBWplnwm/8AVLGEXupnEMvx+ziGj38ItsiLa7hN/TNiobgv92sr/buBPFNuAHOUJl4/AL3tCFVuD3dYrKNMiA0yCBBkmcBgk0SOI0SKBBEqdBAg2SOA0SaJDEaZBAgyROgwQaJHEaJNAgiWs8yBj8gg90oVX4fZ0gmh13+UVTaLtd+D3tI9o1/KLoL98Dzt7IJ/g9rSOaHTz6ReYK9tO+nZXksow9PMLvxR73CUQbwS384i7ZQe0WULydXXAOO4xq1Czs4LHsgrl9wo7bGg/hs4NHu8ghzjKy/xX27bSGSSil+q7X+wMfPDQg3iRBBwAAAABJRU5ErkJggg==";

// ==========================EXEMPLO==========================
// <Select list={[{
//     nome: "Apple",
//     id: 10,
//   },{
//     nome: "Strawberry",
//     id: 17,
//   },{
//     nome: "Pineapple",
//     id: 13,
//   },{
//     nome: "Banana",
//     id: 14,
//   },{
//     nome: "Watermelon",
//     id: 15,
//   },{
//     nome: "Kiwi fruit",
//     id: 16,
//   }]}
//   key_label='name'
//   key_value='id'
//   key_sub_label='id'
//   label='Frutas'
//   value={this.state.value}
//   onChange={(value,data)=>{
//     // console.log(value,data);
//     this.setState({value})
//   }}
//   />
