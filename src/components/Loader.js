import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";

class Loader extends Component {
  render() {
      if (this.props.isLoading) {
        return (<div>Loading...</div>)
      } else {
        return (<React.Fragment>{this.props.children}</React.Fragment>)
      }
  }
}

export default Loader;
