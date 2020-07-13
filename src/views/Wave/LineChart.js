import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import {hexToRgbA} from "../../utils.js";
const colors = require('../../assets/colors.json');

const chartColor = hexToRgbA(colors['cyan'], .8)

class LineChart extends Component {
  render() {

    let timeSeries = this.props.data.timeSeries.discharge;

    let labels = [];
    let data = [];

    for (var date in timeSeries) {
      let cfs = timeSeries[date]; 
      data.push(cfs);
      labels.push(date);
    };

    let dset = {
      label: "Cubic Feet Per Second",
      backgroundColor: "transparent",
      borderColor: chartColor,
      data: data
    };

    let mainChart = {
      labels: labels,
      datasets: [dset]
    };

    const mainChartOpts = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      legend: false,
      maintainAspectRatio: false,
      elements: {
        line: {
          borderWidth: 3
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4
        }
      }
    };
    return (
      <div
        className="chart-wrapper"
        style={{ height: this.props.height + "px"}}
      >
        <Line data={mainChart} options={mainChartOpts} height={this.props.height} />
      </div>
    );
  }
}

export default LineChart;
