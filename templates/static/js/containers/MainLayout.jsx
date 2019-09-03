import React, { Component } from 'react';
import TopNav from '../components/layout/TopNav';

// import BottomNav from '../components/layout/BottomNav';

export default class MainLayout extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      const { children } = this.props
      return (
         <React.Fragment>
            <TopNav />
            {children}
         </React.Fragment>
      )
   }
}
