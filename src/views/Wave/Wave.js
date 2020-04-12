import React, { Component } from "react";
import {
  Col,
  Row,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  Jumbotron
} from "reactstrap";
import LineChart from "./LineChart";
import StatsTable from "./StatsTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { buildApiUrl } from "../../utils";
import Loader from "../../components/Loader";

class Wave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      query: {
        start_date: new Date("2019-01-02"),
        freq: "M"
      },
      data: null
    };
  }

  handleChange = (value, id) => {
    let update = { ...this.state.query };
    update[id] = value;
    this.setState({
      query: update
    });
  };

  handleDateChange = (date, id) => {
    this.setState({
      query: {
        ...this.state.query,
        start_date: date
      }
    });
  };

  getFlowData() {
    let site_id = this.props.match.params.site_id;
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
    let siteChange =
      prevProps.match.params.site_id !== this.props.match.params.site_id;
    let stateChange = prevState.query !== this.state.query;
    if (siteChange || stateChange) {
      this.setState({ isLoading: true });
      this.getFlowData();
    }
  }

  render() {
    return (
      <div className="animated fadeIn mt-2">
        <React.Fragment>
          <Jumbotron className="bg-light">
            {!this.state.isLoading && <h1>{this.state.data.info.site_name}</h1>}
            <hr />
            <Row>
              <Col sm="6" md="3">
                <label>Start date:</label>
                <DatePicker
                  selected={this.state.query.start_date}
                  onChange={date => this.handleChange(date, "start_date")}
                />
              </Col>
              <Col sm="6" md="3">
                <ButtonGroup>
                  {Object.entries({
                    Daily: "D",
                    Weekly: "W",
                    Month: "M"
                  }).map(([key, value]) => (
                    <Button
                      key={key}
                      color={
                        this.state.query.freq === value
                          ? "primary"
                          : "secondary"
                      }
                      value={value}
                      onClick={e =>
                        this.handleChange(e.currentTarget.value, "freq")
                      }
                    >
                      {key}
                    </Button>
                  ))}
                </ButtonGroup>
              </Col>
            </Row>
          </Jumbotron>
          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <div className={"mt-2"}>River flow timeline (CFS)</div>
                </CardHeader>
                <CardBody>
                  <Loader isLoading={this.state.isLoading}>
                    {!this.state.isLoading && (
                      <LineChart
                        data={this.state.data.charts.timeline}
                        height={300}
                      />
                    )}
                  </Loader>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardHeader>Flow statistics (CFS)</CardHeader>
                <CardBody>
                  <Loader isLoading={this.state.isLoading}>
                    {!this.state.isLoading && (
                      <StatsTable data={this.state.data.stats.yearly} />
                    )}
                  </Loader>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      </div>
    );
  }
}
export default Wave;
