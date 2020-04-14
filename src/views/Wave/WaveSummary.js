import React, { Component } from "react";
import { Badge, Card, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { buildApiUrl } from "../../utils";
import LineChart from "./LineChart";
import Loader from "../../components/Loader";

class WaveSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      query: {
        period: "P7D"
      },
      data: null
    };
  }

  getFlowData() {
    let site_id = this.props.site_id;
    let fetch_path =
      buildApiUrl("/api/flow/" + site_id) +
      "?period=" +
      this.state.query.period;
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
    debugger;
    return (
      <Card>
        <Loader isLoading={this.state.isLoading}>
          {!this.state.isLoading && (
            <React.Fragment>
              <CardHeader>
              <Link to={"/wave/" + this.props.site_id}>
                {this.state.data.info.site_name}
                </Link>
                <div className="card-header-actions">
                  <Badge
                    color={this.state.data.info.status ? "success" : "secondary"}
                    className="float-right"
                  >
                    <h6 className="mb-0">{this.state.data.info.status ? "IN SESSION" : "NO SURFING"}</h6>
                  </Badge>
                </div>
              </CardHeader>
              <CardBody className="text-center">
                {this.state.data.charts && (
                  <LineChart
                    data={this.state.data.charts.timeline}
                    height={100}
                  />
                )}
                {this.state.data.info.most_recent_cfs} CFS on{" "}
                {this.state.data.info.end_date}.{" "}<Link to={"/wave/" + this.props.site_id}>
                  More...
                  </Link>
              </CardBody>
            </React.Fragment>
          )}
        </Loader>
      </Card>
    );
  }
}

export default WaveSummary;
