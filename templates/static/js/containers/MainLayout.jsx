import React, { Component } from 'react';
import { Container } from 'reactstrap';
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
            <Container fluid={true}>
               {children}
            </Container>
         </React.Fragment>
      )
   }
}
