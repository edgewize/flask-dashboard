import React, { Component } from "react";
import {
  Col,
  Row,
  Button,
  ButtonGroup,
  Card,
  CardBody,
} from "reactstrap";
import LineChart from "./LineChart";
import StatsTable from "./StatsTable";
// import DatePicker from "react-datepicker";
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
        compare_years: [2019],
        period: "P30D",
        freq: "D",
      },
      data: null,
      site_info: null,
    };
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
    function range(start, end) {
      var ans = [];
      for (let i = start; i <= end; i++) {
        ans.push(i);
      }
      return ans;
    }

    let site_name = null;
    try {
      site_name = this.state.data.info.site_name;
    } catch (TypeError) {
      site_name = null;
    }
    let compare_years = {
      this_year: null,
      last_year: [2019].join(),
      three_years: range(2017, 2019).join(),
      ten_years: range(2010, 2019).join(),
    };

    let time_periods = {
      last_week: "P7" + this.state.query.freq,
      last_month: "P30" + this.state.query.freq,
      last_quarter: "P90" + this.state.query.freq,
      last_year: "P300" + this.state.query.freq,
    };

    return (
      <React.Fragment>
        {site_name && <h1 className={"mb-3"}>{site_name}</h1>}
        <Row>
          <Col md="2">
            <Card>
              <CardBody>
                <h2>Settings</h2>
                <label className={"mt-4"}>Days to include</label>
                <ButtonGroup vertical style={{ width: "100%" }}>
                  {Object.entries(time_periods).map(([key, value]) => (
                    <Button
                      key={key}
                      color={
                        this.state.query.period === value
                          ? "primary"
                          : "secondary"
                      }
                      value={value}
                      onClick={(e) =>
                        this.handleChange(e.currentTarget.value, "period")
                      }
                    >
                      {key}
                    </Button>
                  ))}
                </ButtonGroup>
                <label className={"mt-4"}>Graph interval</label>
                <ButtonGroup vertical style={{ width: "100%" }}>
                  {Object.entries({
                    Daily: "D",
                    Weekly: "W",
                    Month: "M",
                  }).map(([key, value]) => (
                    <Button
                      key={key}
                      color={
                        this.state.query.freq === value
                          ? "primary"
                          : "secondary"
                      }
                      value={value}
                      onClick={(e) =>
                        this.handleChange(e.currentTarget.value, "freq")
                      }
                    >
                      {key}
                    </Button>
                  ))}
                </ButtonGroup>
                <label className={"mt-4"}>Compare to</label>
                <ButtonGroup vertical style={{ width: "100%" }}>
                  {Object.entries(compare_years).map(([key, value]) => (
                    <Button
                      key={key}
                      color={
                        this.state.query.compare_years === value
                          ? "primary"
                          : "secondary"
                      }
                      value={value}
                      onClick={(e) =>
                        this.handleChange(
                          e.currentTarget.value,
                          "compare_years"
                        )
                      }
                    >
                      {key}
                    </Button>
                  ))}
                </ButtonGroup>
              </CardBody>
            </Card>
          </Col>
          <Col md="10">
            <Card>
              <CardBody>
                <h2>River flow timeline (CFS)</h2>
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
            <Card>
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
    );
  }
}
export default Wave;
