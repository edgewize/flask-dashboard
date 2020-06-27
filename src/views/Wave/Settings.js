import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";

class Settings extends Component {

  formatSettingKey(key) {
    let replace = key.split("_").join(" ");
    let upcase = replace.charAt(0).toUpperCase() + replace.substring(1);
    return upcase;    
  }

  render() {

    const settings = {
      period: {
        last_week: "P7D",
        last_month: "P30D",
        last_quarter: "P90D",
        last_year: "P365D",
        last_five_years: "P1825D",
        last_ten_years: "P3650D"
      },
      freq: {
        day: "D",
        week: "W",
        month: "M",
        year: "Y"
      }
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
