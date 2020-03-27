const React = require('react');
const ReactNative = require('react-native');
const {
  TouchableOpacity,
  View
} = ReactNative;

const Button = props => {
  return React.createElement(
    TouchableOpacity,
    props,
    props.children
  );
};

module.exports = Button;