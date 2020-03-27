'use strict';
import React, { Component } from 'react';
// import Icon from './Icon';

import DatePicker from './DatePicker';
 const TimePicker =(props)=>(
   <DatePicker {...props} time={'timeOnly'}/>
 );

export default TimePicker;
