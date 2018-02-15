import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavItem } from 'react-bootstrap';

class Login extends Component {
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
            <div>
                {!isAuthenticated() && <div>
                    You are not Logged in. Please Login to to continue
                    <LinkContainer to="/login">
                        <NavItem eventKey={2} href="#" onClick={this.login.bind(this)}>
                            Login
                        </NavItem>
                    </LinkContainer>
                </div>
                }
            </div>
        );
    }
}

export default Login;
