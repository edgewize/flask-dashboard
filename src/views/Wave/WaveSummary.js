import React, { Component } from "react";
import { Badge, Card, CardBody, CardHeader, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { buildApiUrl } from "../../utils";

class WaveSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      query: {
        start_date: new Date("2020-01-01"),
        freq: "D"
      },
      data: null
    };
  }

  getFlowData() {
    let site_id = this.props.site_id;
    let fetch_path =
      buildApiUrl("/api/flow/" + site_id) +
      "?startDate=" +
      this.state.query.start_date.toISOString().split("T")[0] +
      "&freq=" +
      this.state.query.freq;
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
    this.getFlowData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.getFlowData();
    }
  }

  render() {
    return (
      <Card>
        {this.state.isLoading && (
          <div className="animated fadeIn pt-1 text-center">Loading...</div>
        )}
        {!this.state.isLoading && (
          <React.Fragment>
            <CardHeader>
              {this.state.data.info.site_name}
              <div className="card-header-actions">
                <Badge color="success" className="float-right">
                  Success
                </Badge>
              </div>
            </CardHeader>
            <CardBody>
              {this.state.data.info.most_recent_cfs} CFS on{" "}
              {this.state.data.info.end_date}
              <Button tag={Link} to={"/wave/" + this.props.site_id}>
                Info
              </Button>
            </CardBody>
          </React.Fragment>
        )}
      </Card>
    );
  }
}

export default WaveSummary;
