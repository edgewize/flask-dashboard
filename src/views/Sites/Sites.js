import React, { Component } from "react";
import { buildApiUrl } from "../../utils";
import Loader from "../../components/Loader";
import SiteTable from "./SiteTable"

class Sites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      query: {
        state_cd: "ID",
      },
      sites: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (value, id) => {
    let update = { ...this.state.query };
    update[id] = value;
    this.setState({
      query: update,
    });
  };

  getSiteData() {
    let state_cd = this.props.match.params.state_cd;
    let fetch_path = buildApiUrl("/api/sites/get/" + state_cd);
    fetch(fetch_path)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          isLoading: false,
          sites: result,
        });
      });
  }

  // componentDidMount() {
  //   this.getSiteData();
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   let siteChange =
  //     prevProps.match.params.state_cd !== this.props.match.params.state_cd;
  //   // let stateChange = prevState.query !== this.state.query;
  //   if (siteChange) {
  //     this.setState({ isLoading: true });
  //     this.getSiteData();
  //   }
  // }

  render() {
    return (
      <React.Fragment>
        <h1>Sites</h1>

        <Loader isLoading={this.state.isLoading}>
          {!this.state.isLoading && (
            <React.Fragment>
              <SiteTable />
            </React.Fragment>
          )}
        </Loader>
      </React.Fragment>
    );
  }
}
export default Sites;
