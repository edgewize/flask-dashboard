import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import WaveSummary from "../Wave/WaveSummary";

class SummaryGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [13206000, 13247500, 13337000, 13246000],
    };
  }
  render() {
    return (
      <Row>
        {this.state.data.map((site_id) => (
          <Col md="6">
            <WaveSummary key={site_id} site_id={site_id} />
          </Col>
        ))}
      </Row>
    );
  }
}

export default SummaryGallery;
