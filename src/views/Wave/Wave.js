import React, { Component } from "react";
import { Col, Row, Card, CardBody } from "reactstrap";
import LineChart from "./LineChart";
import StatsTable from "./StatsTable";
import "react-datepicker/dist/react-datepicker.css";
import { buildApiUrl } from "../../utils";
import Loader from "../../components/Loader";
import Settings from "./Settings";
import DonutChart from "./DonutChart";

class Wave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      query: {
        start_date: new Date("2019-01-02"),
        compare_years: "2019",
        period: "P30D",
        freq: "D",
      },
      data: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (value, id) => {
    let update = { ...this.state.query };
    update[id] = value;
    this.setState({
      query: update,
    });
  };

  handleDateChange = (date, id) => {
    this.setState({
      query: {
        ...this.state.query,
        start_date: date,
      },
    });
  };

  getFlowData() {
    let site_id = this.props.match.params.site_id;
    let fetch_path =
      buildApiUrl("/api/flow/" + site_id) +
      "?period=" +
      this.state.query.period +
      "&freq=" +
      this.state.query.freq +
      "&compare_years=" +
      this.state.query.compare_years;
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
    let siteChange =
      prevProps.match.params.site_id !== this.props.match.params.site_id;
    let stateChange = prevState.query !== this.state.query;
    if (siteChange || stateChange) {
      this.setState({ isLoading: true });
      this.getFlowData();
    }
  }

  render() {
    let site_name = null;
    try {
      let meta = this.state.data.meta;
      site_name = meta[Object.keys(meta)[0]
      ].siteName;
    } catch (TypeError) {
      site_name = null;
    }
    return (
      <React.Fragment>
        {site_name && <h1 className={"mb-3"}>{site_name}</h1>}
        <Row>
          <Col md="2">
            <Card>
              <CardBody>
                <h2>Settings</h2>
                <Settings
                  handleChange={this.handleChange}
                  query={this.state.query}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md="10">
            <Card>
              <CardBody>
                <h2>Cubic feet per second (CFS)</h2>
                <Loader isLoading={this.state.isLoading}>
                  {!this.state.isLoading && (
                    <LineChart data={this.state.data} height={300} />
                  )}
                </Loader>
              </CardBody>
            </Card>
            {/* <Row>
              <Col md="6">
                <Card>
                  <CardBody>
                    <h2>CFS stats</h2>
                    <Loader isLoading={this.state.isLoading}>
                      {!this.state.isLoading && (
                        <StatsTable data={this.state.data.stats.yearly} />
                      )}
                    </Loader>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6">
                <Card>
                  <CardBody>
                    <h2>Time in session</h2>
                    <Loader isLoading={this.state.isLoading}>
                      {!this.state.isLoading && (
                        <DonutChart data={this.state.data.charts.session} />
                      )}
                    </Loader>
                  </CardBody>
                </Card>
              </Col>
            </Row> */}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
export default Wave;
