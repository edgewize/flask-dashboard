import React, { Component } from 'react';
import { Table, Progress } from 'reactstrap';

export default class CastTable extends Component {
    constructor(props) {
        super(props);
        this.updateSearch = this.props.updateSearch;
        this.state = {
            isLoading: true,
            castRecords: null,
        };
    }

    componentDidMount() {
        fetch("/api/cast")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        castRecords: result,
                        isLoading: false
                    });
                },
            )
    }

    render() {
        return (
            <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                    <tr>
                        <th className="text-center"><i className="icon-people"></i></th>
                        <th>User</th>
                        <th className="text-center">Country</th>
                        <th>Usage</th>
                        <th className="text-center">Payment Method</th>
                        <th>Activity</th>
                    </tr>
                </thead>
                {!this.state.isLoading &&
                    this.state.castRecords && <tbody>
                        {this.state.castRecords.map((record) => (<tr>
                            <td className="text-center">
                                <div className="avatar">
                                    <img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    <span className="avatar-status badge-success"></span>
                                </div>
                            </td>
                            <td>
                                <div>{record.name}</div>
                                <div className="small text-muted">
                                    <span>New</span> | Registered: Jan 1, 2015
                                </div>
                            </td>
                            <td className="text-center">
                                <i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>
                            </td>
                            <td>
                                <div className="clearfix">
                                    <div className="float-left">
                                        <strong>50%</strong>
                                    </div>
                                    <div className="float-right">
                                        <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                                    </div>
                                </div>
                                <Progress className="progress-xs" color="success" value="50" />
                            </td>
                            <td className="text-center">
                                <i className="fa fa-cc-mastercard" style={{ fontSize: 24 + 'px' }}></i>
                            </td>
                            <td>
                                <div className="small text-muted">Last login</div>
                                <strong>10 sec ago</strong>
                            </td>
                        </tr>))}
                    </tbody>}
            </Table>

        );
    }
}
