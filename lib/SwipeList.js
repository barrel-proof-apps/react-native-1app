import React,{ Component } from 'react';
// import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import map from 'lodash/map';
// import find from 'lodash/find';
// import reduce from 'lodash/reduce';

import SwipeList from 'react-native-smooth-swipe-list';



export default class TodoSwipeList extends Component {

  propTypes: {
    todos: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,

    renderItem: PropTypes.func.isRequired,
    rightSubView: PropTypes.func.isRequired,
    leftSubView: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired,
    styleRow: PropTypes.object.isRequired,

  }
  //       constructor(props) {
  //     state={}
  // },
  // componentWillMount() {
  //   this.rowData = map(this.props.todos, this.constructRowData);
  // }

  componentDidMount() {

    // open the row on the left, then the right
    if(this.props.rightSubView&&this.props.leftSubView){
      Promise.resolve()
      .then(() => this.swipeList.calloutRow(1, 50))
      .then(() => this.swipeList.calloutRow(1, -50));
    }else if (this.props.rightSubView) {
      Promise.resolve().then(() => this.swipeList.calloutRow(1, -50));
    }else if(this.props.leftSubView) {
      Promise.resolve().then(() => this.swipeList.calloutRow(1, 50));
    }
  }

  movimentar(p=1) {
    // open the row on the left, then the right
    if(this.props.rightSubView&&this.props.leftSubView){

      Promise.resolve()
      .then(() => this.swipeList.calloutRow(p, 50))
      .then(() => this.swipeList.calloutRow(p, -50));
    }else if (this.props.rightSubView) {
      Promise.resolve().then(() => this.swipeList.calloutRow(p, -50));
    }else if(this.props.leftSubView) {
      Promise.resolve().then(() => this.swipeList.calloutRow(p, 50));
    }
  }


  render() {
    // console.log(this.rowData);
    const {data=[],renderItem=null,rightSubView=null,leftSubView=null,style={},styleRow={}}=this.props;
    return (
      <SwipeList
        {...this.props}
        ref={v => (this.swipeList = v)}

        rowData={data.map((item, index)=>({
          id: index,
          rowView: renderItem({ item, index} ),
          rightSubView: rightSubView?rightSubView(item):null,
          // leftSubView: this.getArchiveButton(todo),
          leftSubView: leftSubView?leftSubView(item):null,

          leftSubViewOptions: {
            closeOnPress: false
          },

        })
      )}
      style={[{backgroundColor:null},style]}
      rowStyle={[styles.row,styleRow]}
      />
  );
}
}




const styles = StyleSheet.create({
  swipeListContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },


  row: {
    alignSelf: 'stretch',
    backgroundColor: null
  },
  fullSubView: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(50, 175, 175)'
  },
  buttonText: {
    color: '#fff',
    backgroundColor: 'transparent'
  }
});
