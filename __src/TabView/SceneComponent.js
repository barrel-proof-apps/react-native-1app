const React = require('react');
const ReactNative = require('react-native');
const {Component } = React;
const {View, StyleSheet } = ReactNative;

const StaticContainer = require('react-native/Libraries/Components/StaticContainer');

const SceneComponent = (Props) => {
  const {shouldUpdated  } = Props;
  return <View {...props}>
      <StaticContainer shouldUpdate={shouldUpdated}>
        {props.children}
      </StaticContainer>
  </View>;
};

module.exports = SceneComponent;
