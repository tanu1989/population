import React, { Component } from 'react';
import { Link } from 'react-router';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class App extends Component {
    render() {
        const { children } = this.props;

        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">World Population</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1}><Link to='/'>Home</Link></NavItem>
                        <NavItem eventKey={2}> <Link to='/about'>About</Link></NavItem>
                    </Nav>
                </Navbar>
                { children }
            </div>
        );
    }
}