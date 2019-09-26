import React, { Component } from 'react';
import { Table, Card } from 'reactstrap';
import CastRow from './CastRow'

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
            <Card>
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
                            {this.state.castRecords.map((record) => (<CastRow castId={record.castId} updateSearch={this.updateSearch} />))}
                        </tbody>}
                </Table>
            </Card>
        );
    }
}
