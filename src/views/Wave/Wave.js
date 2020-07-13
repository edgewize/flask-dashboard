import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import LineChart from "./LineChart";
import "react-datepicker/dist/react-datepicker.css";
import { buildApiUrl } from "../../utils";
import Loader from "../../components/Loader";
import Settings from "./Settings";


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
      site_name = meta[Object.keys(meta)[0]].siteName;
    } catch (TypeError) {
      site_name = null;
    }
    return (
      <React.Fragment>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
              {site_name && <h1 className={"mb-0"}>{site_name}</h1>}
              </CardBody>

            </Card>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle className={"h3 mb-0"}>
                Cubic feet per second (CFS)
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Loader isLoading={this.state.isLoading}>
                  {!this.state.isLoading && (
                    <LineChart data={this.state.data} height={300} />
                  )}
                </Loader>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card className="text-center">
              <CardBody>
                <Settings
                  handleChange={this.handleChange}
                  query={this.state.query}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
export default Wave;
