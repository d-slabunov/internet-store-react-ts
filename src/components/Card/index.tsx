import {Button, Card} from "react-bootstrap";
import React from "react";

<Card style={{ width: '18rem' }}>
<Card.Img variant="top" src='/1.jpg' />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
<Card.Text>
Some quick example text to build on the card title and make up the bulk of
the card's content.
</Card.Text>
<Button variant="primary">Go somewhere</Button>
</Card.Body>
</Card>\


import React, {Component} from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import './style.scss';

class Content extends React.Component {

  render() {
    return (
      <Container>

        </Container>
    )
  }
}

export default Content