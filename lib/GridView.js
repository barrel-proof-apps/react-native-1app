import React, { Component } from 'react';

import GridView from "react-native-super-grid";



export default function Grid(props){
  return (
    <GridView
      itemDimension={100}
      spacing={5}
      {...props}
      items={props.dataSource||props.data}
      renderItem={({item,index}, sectionID, rowID) => {
        if(props.renderRow)return props.renderRow(item,index,(index-1));
        return props.renderItem({item,index}, sectionID);
      }}/>
  );
}
