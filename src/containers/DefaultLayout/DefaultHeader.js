import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { AppSidebarToggler } from "@coreui/react";

class DefaultHeader extends Component {
  render() {
    debugger;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        
        <Link to="/">
          <h4 className={"mb-0 ml-3"}>RIVER WAVE ANALYTICS</h4>
        </Link>

        <Nav className="d-md-down-none" navbar>
          {this.props.nav.items.map((link) => (
            <NavItem className="px-3">
              <NavLink to="/dashboard" className="nav-link">
                {!link.title && (
                  <Link to={link.url} className="nav-link">
                    {link.name}
                  </Link>
                )}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </React.Fragment>
    );
  }
}

export default DefaultHeader;
