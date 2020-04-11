import React, { Component } from "react";
import {
  Col,
  Row,
} from "reactstrap";
import WaveSummary from "../Wave/WaveSummary";
import "react-datepicker/dist/react-datepicker.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      site_list: [13246000, 13245000, 13206000],
      query: {
        site_id: 13206000,
      },
    };
  }

  render() {
    return (
      <div className="animated fadeIn mt-2">
        <React.Fragment>
          <Row>
            {this.state.site_list.map(site_id => (
            <Col md="4">
              <WaveSummary site_id={site_id} />
            </Col>
            ))}
          </Row>
        </React.Fragment>
      </div>
    );
  }
}

export default Dashboard;
