import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import SummaryGallery from "./SummaryGallery";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
              <h1>
                Track river flow trends for Idaho surf waves.
              </h1>
              <p>
                Project made possible by information from the
                {" "}<a href="https://waterdata.usgs.gov/nwis">
                  US Geological survey
                </a>{" "}
                and <a href="http://riverbreak.com/">Riverbreak Magazine</a>
              </p>
              <hr className="mb-4" />
          </Col>
        </Row>
        <SummaryGallery />
      </div>
    );
  }
}

export default Dashboard;
