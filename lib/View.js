import React, { Component } from 'react';

import  {
  View,Platform
} from 'react-native'
const NewView =(props)=>(
  <View {...props} style={[isElevation(props.elevation),props.style]}/>
);
function isElevation(elevation){
  if (elevation) {
    return Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: (0.5/elevation),
        shadowRadius: (2/elevation),
        // shadowOffset: {
        //   height: 1,
        //   width: 0
        // }
      },
      android: {
        elevation: (5/elevation),
      },
    });
  }
  return null;
}

export default NewView;
