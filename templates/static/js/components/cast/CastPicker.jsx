import React, { Component } from 'react';
import CastImage from './CastImage';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


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
            <SideNav>
                <SideNav.Toggle />

                {!this.state.isLoading &&
                    this.state.castRecords && <SideNav.Nav defaultSelected={this.state.castRecords[0].castId}>
                        {this.state.castRecords.map((record) => (<NavItem key={record.castId}
                            eventKey={record.castId}
                            onClick={(e) => { this.updateSearch('cast', record.castId) }}>
                            <NavIcon>
                                <CastImage castId={record.castId} />
                            </NavIcon>
                            <NavText>
                                {record.name}
                            </NavText>
                        </NavItem>))}
                    </SideNav.Nav>}
            </SideNav>
        );
    }
}
