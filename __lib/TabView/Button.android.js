var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const React = require('react');
const ReactNative = require('react-native');
const {
  TouchableNativeFeedback,
  View
} = ReactNative;

const Button = props => {
  return React.createElement(
    TouchableNativeFeedback,
    _extends({
      delayPressIn: 0,
      background: TouchableNativeFeedback.SelectableBackground() // eslint-disable-line new-cap
    }, props),
    props.children
  );
};

module.exports = Button;