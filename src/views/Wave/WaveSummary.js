import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
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
        period: "P7D",
      },
      data: null,
    };
  }

  getFlowData() {
    let site_id = this.props.site_id;
    let fetch_path =
      buildApiUrl("/api/flow/" + site_id) +
      "?period=" +
      this.state.query.period;
    fetch(fetch_path)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          isLoading: false,
          data: result,
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
              <CardBody>
                {/* <Link to={"/wave/" + this.props.site_id}> */}
                  {/* <h5>{this.state.data.info.site_name}</h5> */}
                {/* </Link> */}
                <div>
                  {this.state.data && (
                    <LineChart
                      data={this.state.data.timeSeries}
                      height={200}
                    />
                  )}
                </div>
                {/* <label className={"text-center d-block mt-2 mb-0"}>
                  {this.state.data.info.most_recent_cfs} CFS on{" "}
                  {this.state.data.info.end_date}.{" "}
                  <Link to={"/wave/" + this.props.site_id}>More...</Link>
                </label> */}
              </CardBody>
            </React.Fragment>
          )}
        </Loader>
      </Card>
    );
  }
}

export default WaveSummary;
