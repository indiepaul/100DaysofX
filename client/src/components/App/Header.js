import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';

class Header extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">100DaysofX</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/goals">
              <NavItem eventKey={1} href="#">
                Goals
              </NavItem>
            </LinkContainer>
            {!isAuthenticated() && <LinkContainer to="/login">
              <NavItem eventKey={2} href="#" onClick={this.login.bind(this)}>
                Login
              </NavItem>
            </LinkContainer>
            }
            {isAuthenticated() && <NavDropdown eventKey={2} title="Me" id="basic-nav-dropdown">
                <MenuItem eventKey={2.1} onClick={this.logout.bind(this)}>Logout</MenuItem>
                <LinkContainer to="/profile">
                  <MenuItem eventKey={2.2}>Profile</MenuItem>
                </LinkContainer>
              </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
