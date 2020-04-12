import React, { Component } from "react";
import { Col, Row, Jumbotron } from "reactstrap";
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
      <div className="animated fadeIn mt-5">
        <Row>
          <Col>
            <Jumbotron className="bg-secondary">
              <h1 className="display-3">River Surf Analytics</h1>
              <p className="lead">
                Track river flow trends at surf waves in Idaho,
              </p>
              <hr className="my-2" />
              <p>
                Project made possible by information from the
                <a href="https://waterdata.usgs.gov/nwis">
                  US Geological survey
                </a>
                and <a href="http://riverbreak.com/">Riverbreak Magazine</a>
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <SummaryGallery />
      </div>
    );
  }
}

export default Dashboard;
