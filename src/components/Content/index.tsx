import React, {Component} from 'react';
import {Navbar, Button } from 'react-bootstrap';
import './style.scss';

class Content extends React.Component {

  render() {
    return (
      <Navbar className="header" bg="dark" variant="dark">
    <Navbar.Brand href="#home">
    <img
      alt=""
    src=""
    width="30"
    height="30"
    className="d-inline-block align-top"
      />
      {' React Bootstrap'}
      </Navbar.Brand>
      <Button className="header__button" type="submit">Submit</Button>
      </Navbar>
  )
  }
}

export default Content