import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import { buildApiUrl } from "../../utils";
import LineChart from "./LineChart";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

class WaveSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      query: {
        period: "P7D",
        freq: "D"
      },
      data: null,
    };
  }

  getFlowData() {
    let site_id = this.props.site_id;
    let fetch_path =
      buildApiUrl("/api/flow/" + site_id) +
      "?period=" +
      this.state.query.period +
      "&freq=" +
      this.state.query.freq;
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
    let site_name = null;
    try {
      let meta = this.state.data.meta;
      site_name = meta[Object.keys(meta)[0]].siteName;
    } catch (TypeError) {
      site_name = null;
    }
    return (
      <Card>
        <Loader isLoading={this.state.isLoading}>
          {!this.state.isLoading && (
            <React.Fragment>
              <CardBody>
                <Link to={"/wave/" + this.props.site_id}>
                <h5>{site_name}</h5>
                </Link>
                <div>
                  {this.state.data && (
                    <LineChart data={this.state.data} height={200} />
                  )}
                </div>
                <label className={"text-center d-block mt-2 mb-0"}>
                  <Link to={"/wave/" + this.props.site_id}>More...</Link>
                </label>
              </CardBody>
            </React.Fragment>
          )}
        </Loader>
      </Card>
    );
  }
}

export default WaveSummary;
