import React, { Component, lazy, Suspense } from "react";
import { Col, Row } from "reactstrap";

const LineChart = lazy(() => import("../../views/Dashboard/LineChart"));

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lineChart: null,
      isLoading: true
    };
  }

  // getInfo() {
  //   fetch("http://127.0.0.1:9999/api/flow/13206000")
  //     .then(res => res.json())
  //       console.log(res);
  //     // .then(result => {
  //     //   this.setState({
  //     //     lineChart: result
  //     //   });
  //     });
  // }

  componentDidMount() {
    const fetch_path = (process.env.NODE_ENV === "development" ? "http://127.0.0.1:9999" : "") + "/api/film?limit=10";
    fetch("fetch_path")
      .then(res => res.json())
      .then(result => {
        this.setState({
          lineChart: result,
          isLoading: false
        });
      });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="animated fadeIn">
        <Suspense fallback={this.loading()}>
          <Row>
            <Col>
              {this.state.lineChart && (
                <LineChart
                  labels={this.state.lineChart.labels}
                  data={this.state.lineChart.data}
                />
              )}
            </Col>
          </Row>
        </Suspense>
      </div>
    );
  }
}

export default Dashboard;
