import React, { Component } from "react";
import { Table } from "reactstrap";

class StatsTable extends Component {
  render() {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Year</th>
            <th>Min</th>
            <th>Avg</th>
            <th>Max</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map(record => (
            <tr key={record.year}>
              <td>{record.year}</td>
              <td>{Math.round(record.min)}</td>
              <td>{Math.round(record.mean)}</td>
              <td>{Math.round(record.max)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
export default StatsTable;
