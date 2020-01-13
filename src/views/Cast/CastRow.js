import React, { Component } from 'react';
import { Progress, Button } from 'reactstrap';


export default class CastRow extends Component {
    constructor(props) {
        super(props);
        this.updateSearch = this.props.updateSearch;
        this.state = {
            isLoading: true,
            tmdbInfo: null
        };
    }

    componentDidMount() {
        fetch("/api/tmdb/person/" + this.props.castId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        tmdbInfo: result,
                        isLoading: false
                    });
                }
            )
    }

    render() {
        return (
            <tr onClick={() => this.updateSearch('cast', this.props.castId)}>
                {!this.state.isLoading && <React.Fragment>
                    <td className="text-center">
                        <div className="avatar">
                            <img src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2/" + this.state.tmdbInfo.profile_path}
                                className="img-avatar"
                                alt={this.state.tmdbInfo.name + " head shot"} />
                        </div>
                    </td>
                    <td>
                        <div>{this.state.tmdbInfo.name}</div>
                        <div className="small text-muted">
                            Birthday: {this.state.tmdbInfo.birthday}}
                        </div>
                    </td>
                    <td className="text-center">

                        <i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>
                    </td>
                    <td>
                        <div className="clearfix">
                            <div className="float-left">
                                <strong>{Math.round(this.state.tmdbInfo.popularity * 10, 2)}</strong>
                            </div>
                            <div className="float-right">
                                <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                            </div>
                        </div>
                        <Progress className="progress-xs" color="success" value={this.state.tmdbInfo.popularity * 10} />
                    </td>
                    <td className="text-center">
                        <Button >Info</Button>
                    </td>
                    <td>
                        <div className="small text-muted">Last login</div>
                        <strong>10 sec ago</strong>
                    </td>
                </React.Fragment>}
            </tr>
        );
    }
}
