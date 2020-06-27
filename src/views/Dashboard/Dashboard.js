import React, { Component } from "react";
import { Col, Row, Card, CardBody } from "reactstrap";
import SummaryGallery from "./SummaryGallery";

class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <h1>Idaho Surf Report</h1>
                <p>
                  Track river flow trends for Idaho surf waves. Project made
                  possible by information from the{" "}
                  <a href="https://waterdata.usgs.gov/nwis">
                    US Geological survey
                  </a>{" "}
                  and <a href="http://riverbreak.com/">Riverbreak Magazine</a>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <SummaryGallery />
      </div>
    );
  }
}

export default Dashboard;
