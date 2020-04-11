import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

class LineChart extends Component {
  render() {
    const mainChart = this.props.data;
    const mainChartOpts = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
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
        style={{ height: 300 + "px"}}
      >
        <Line data={mainChart} options={mainChartOpts} height={300} />
      </div>
    );
  }
}

export default LineChart;
