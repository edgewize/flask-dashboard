import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class DonutChart extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Doughnut data={this.props.data} />
      </div>
    );
  }
}

export default DonutChart;
