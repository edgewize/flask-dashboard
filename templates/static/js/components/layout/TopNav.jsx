import React from 'react';
import { Navbar, NavbarBrand} from 'reactstrap';

export default class TopNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar color={"dark"}>
                <NavbarBrand href={"/"}>FILMNETWORKS</NavbarBrand>
            </Navbar>
        );
    }
}
