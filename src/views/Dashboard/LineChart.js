import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardBody } from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";

const brandPrimary = getStyle("--primary");

// Card Chart 1
const mainChart = {
  labels: this.props.labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandPrimary,
      borderColor: "rgba(255,255,255,.55)",
      data: this.props.data
    }
  ]
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent"
        }
      }
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, mainChart.datasets[0].data) - 5,
          max: Math.max.apply(Math, mainChart.datasets[0].data) + 5
        }
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

class LineChart extends Component {
  render() {
    debugger;
    return (
      <Card>
        <CardBody>
          <div
            className="chart-wrapper"
            style={{ height: 300 + "px", marginTop: 40 + "px" }}
          >
            <Line data={mainChart} options={mainChartOpts} height={300} />
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default LineChart;
