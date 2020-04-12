import React, { Component } from "react";
import { Badge, Card, CardBody, CardHeader, Button } from "reactstrap";
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
    return (
      <Card>
        <Loader isLoading={this.state.isLoading}>
          {!this.state.isLoading && (
            <React.Fragment>
              <CardHeader>
                {this.state.data.info.site_name}
                <div className="card-header-actions">
                  {this.state.data.info.status}
                  <Badge
                    color={this.state.data.info.status ? "primary" : "warning"}
                    className="float-right"
                  >
                    <h6 className="mb-0">{this.state.data.info.status ? "IN SESSION" : "NO SUFING"}</h6>
                  </Badge>
                </div>
              </CardHeader>
              <CardBody>
                {this.state.data.charts && (
                  <LineChart
                    data={this.state.data.charts.timeline}
                    height={100}
                  />
                )}
                {this.state.data.info.most_recent_cfs} CFS on{" "}
                {this.state.data.info.end_date}
                <Button tag={Link} to={"/wave/" + this.props.site_id}>
                  Info
                </Button>
              </CardBody>
            </React.Fragment>
          )}
        </Loader>
      </Card>
    );
  }
}

export default WaveSummary;
