import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

const data = require('./idaho_sites.json');

class SiteTable extends Component {
  render() {
    return (
      <Table responsive>
        <tbody>
          {data.value.timeSeries.map((site) => (
            <tr key={site.name}>
              <td>
                <Link to={"/wave/" + site.sourceInfo.siteCode[0].value}>
                  {site.sourceInfo.siteName}
                </Link>
              </td>
              <td>{site.values[0].value[0].dateTime}</td>
              <td>{site.values[0].value[0].value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
export default SiteTable;
