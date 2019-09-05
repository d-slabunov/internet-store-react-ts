import React, {useState, useEffect} from 'react';
import {Form, Button, Col, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import './style.scss';

interface Props extends ReturnType<typeof mapStateToProps> {
  show: boolean;
  onHide: any;
  click: any;
}

const Forms: React.FC<Props> = (props) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    //TODO----------------------------------
  };

  const finalPrice = () => {
    let price = 0;
    props.products.forEach((item: any) => price += item.price * item.count)
    return price;
  };

  return (
    <Modal
      {...props}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
  >
  <Modal.Header closeButton>
  <Modal.Title id="contained-modal-title-vcenter">
    Basket!!!
    </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
  <Form.Row>
    <Form.Group as={Col} md="4" controlId="validationCustom01">
    <Form.Label>First name</Form.Label>
  <Form.Control
  required
  type="text"
  placeholder="First name"
  />
  </Form.Group>
  <Form.Group as={Col} md="4" controlId="validationCustom02">
    <Form.Label>Last name</Form.Label>
  <Form.Control
  required
  type="text"
  placeholder="Last name"
  />
  </Form.Group>
  </Form.Row>
  <Form.Row>
  <Form.Group as={Col} md="6" controlId="validationCustom03">
    <Form.Label>City</Form.Label>
    <Form.Control type="text" placeholder="City" required/>
  </Form.Group>
  <Form.Group as={Col} md="6" controlId="validationCustom04">
    <Form.Label>Phone</Form.Label>
    <Form.Control
  type="tel"
  pattern="^\d{11}$"
  placeholder="1-(111)-111-11-11"
  required/>
  </Form.Group>
  </Form.Row>
  <Form.Row>
  <Button type="submit">Submit form</Button>
  </Form.Row>
  </Form>
  </Modal.Body>
  {/*<Modal.Footer>*/}
  {/*    <Modal.Title>Price </Modal.Title>*/}
  {/*    <Button onClick={onHide}>Order</Button>*/}
  {/*</Modal.Footer>*/}
  </Modal>


);
};

const mapStateToProps = (state: any) => ({
  products: state.store.products,
});

export default connect(mapStateToProps)(Forms);
