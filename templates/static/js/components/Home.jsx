import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import MainLayout from '../containers/MainLayout';
import CastPicker from './cast/CastPicker';
import CastInfo from './cast/CastInfo';

export default class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         searchType: null,
         searchId: null
      }
      this.updateSearch = this.updateSearch.bind(this)
   }

   updateSearch(type, id) {
      this.setState({ searchType: type, searchId: id });;
   }

   render() {
      return (
         <MainLayout>
            <h1>Hello React!</h1>
            <Row>
               <Col md={"4"}>
                  <CastPicker
                     updateSearch={this.updateSearch} />
               </Col>
               <Col md={"8"}>
                  {this.state.searchId && <CastInfo
                     castId={this.state.searchId} />
                  }
               </Col>
            </Row>

         </MainLayout>
      )
   }
}
