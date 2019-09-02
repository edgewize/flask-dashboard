import React, { Component } from 'react';
import DataChecker from './manage/DataChecker'

export default class Home extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div>
            <h1>Hello React!</h1>
            <DataChecker />
         </div>
      )
   }
}
