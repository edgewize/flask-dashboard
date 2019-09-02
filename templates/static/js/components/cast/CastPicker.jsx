import React, { Component } from 'react';
import { InputGroup, Label, Input } from 'reactstrap';


export default class CastPicker extends Component {
    constructor(props) {
        super(props);
        this.updateSearch = this.props.updateSearch;
        this.state = {
            isLoading: true,
            dropdownOpen: false,
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
            <React.Fragment>
                {!this.state.isLoading &&
                    this.state.castRecords && this.state.castRecords.map((record) => (
                        <div key={record.castId}>
                            <a href={'#'} key={record.castId} value={record.name} onClick={(e) => this.updateSearch('cast', record.castId)}>
                                {record.name}
                            </a>
                        </div>
                    ))
                }
            </React.Fragment>
        );
    }
}
