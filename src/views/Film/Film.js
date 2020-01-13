import React, { Component } from 'react';
import {
  Col,
  Row,
} from 'reactstrap';


class Film extends Component {
  constructor(props) {
    super(props);
    this.updateSearch = this.updateSearch.bind(this)
    this.state = {
      searchId: null
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  updateSearch(type, id) {
    this.setState({ searchType: type, searchId: id });
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
        {this.state.searchId &&
          <Col md="2">

          </Col>}
          <Col md={this.state.searchId ? 4 : 12}>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Film;
