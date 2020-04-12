import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import WaveSummary from "../Wave/WaveSummary";
import { buildApiUrl } from "../../utils";

class SummaryGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null
    };
  }

  getSiteData() {
    let fetch_path = buildApiUrl("/api/sites/getinfo");
    fetch(fetch_path)
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoading: false,
          data: result
        });
      });
  }

  componentDidMount() {
    this.getSiteData();
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.isLoading && (
          <Row>
            {this.state.data.map(record => (
              <Col md="4">
                <WaveSummary site_id={record["site_id"]} />
              </Col>
            ))}
          </Row>
        )}
      </React.Fragment>
    );
  }
}

export default SummaryGallery;
