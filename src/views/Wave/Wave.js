import React, { Component } from "react";
import {
  Col,
  Row,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import LineChart from "./LineChart";
import StatsTable from "./StatsTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Wave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      query: {
        start_date: new Date("2019-01-02"),
        site_id: 13206000,
        freq: "M"
      },
      data: null
    };
  }

  handleChange = (value, id) => {
    this.setState({ isLoading: false });
    let update = { ...this.state.query };
    update[id] = value;
    this.setState({
      isLoading: true,
      query: update
    });
  };

  handleDateChange = (date, id) => {
    debugger;
    this.setState({
      query: {
        ...this.state.query,
        start_date: date
      }
    });
  };

  getFlowData() {
    let site_id = this.props.match.params.site_id;
    let api_target =
      process.env.NODE_ENV === "development" ? "http://127.0.0.1:9999" : "";
    let fetch_path =
      api_target +
      "/api/flow/" + site_id +
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
      <div className="animated fadeIn mt-2">
        <React.Fragment>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <Row>
                    <Col md="6">
                      <div className={"mt-2"}>River flow timeline (CFS)</div>
                    </Col>
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
                </CardHeader>
                {this.state.isLoading && (
                  <div className="animated fadeIn pt-1 text-center">
                    Loading...
                  </div>
                )}
                {!this.state.isLoading && (
                  <CardBody>
                    <b>{this.state.data.info.site_name}</b>
                    <Row>
                      <Col md="8">
                        <LineChart data={this.state.data.charts.timeline} />
                      </Col>
                      <Col md="4">
                        <StatsTable data={this.state.data.stats.yearly} />
                      </Col>
                    </Row>
                  </CardBody>
                )}
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      </div>
    );
  }
}

export default Wave;
