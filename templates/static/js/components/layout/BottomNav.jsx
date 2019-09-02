import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

export default class BottomNav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <footer className={"footer"}>
                <div className={"container"}>
                    <span className={"text-muted"}>Place sticky footer content here.</span>
                </div>
            </footer>
        );
    }
}
