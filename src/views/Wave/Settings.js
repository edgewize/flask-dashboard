import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { range } from "../../utils";

class Settings extends Component {

  formatSettingKey(key) {
    let replace = key.split("_").join(" ");
    let upcase = replace.charAt(0).toUpperCase() + replace.substring(1);
    return upcase;    
  }

  render() {
    let compare_years = {
      last_year: "2019",
      three_years: range(2017, 2019).join(),
      ten_years: range(2010, 2019).join(),
    };

    let time_periods = {
      last_week: "P7D",
      last_month: "P30D",
      last_quarter: "P90D"
    };

    let freq_intervals = {
      Daily: "D",
      Weekly: "W",
      Monthly: "M",
    };

    let settings = {
      compare_years: compare_years,
      period: time_periods,
      freq: freq_intervals,
    };

    return (
      <React.Fragment>
        {Object.entries(settings).map(([label, options]) => (
          <React.Fragment>
            <label className={"mt-4"}>{this.formatSettingKey(label)}</label>
            <ButtonGroup vertical style={{ width: "100%" }}>
              {Object.entries(options).map(([key, value]) => (
                <Button
                  key={key}
                  color={
                    this.props.query[label] === value ? "info" : "secondary"
                  }
                  value={value}
                  onClick={(e) =>
                    this.props.handleChange(e.currentTarget.value, label)
                  }
                >
                  {this.formatSettingKey(key)}
                </Button>
              ))}
            </ButtonGroup>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

export default Settings;
