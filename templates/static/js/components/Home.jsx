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
            <div style={{ position: 'relative', height: 'calc(100vh - 50px)' }}>
               <CastPicker updateSearch={this.updateSearch} />
               <div style={{ "marginLeft": "64px", "padding": "15px 20px 0px" }}>
                  {this.state.searchId && <CastInfo
                     castId={this.state.searchId} />
                  }
               </div>
            </div>
         </MainLayout>
      )
   }
}
