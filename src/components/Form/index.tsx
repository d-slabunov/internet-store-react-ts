import React, { useState } from 'react';
import { Form, Button, Col, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteAllProduct } from "../../store/actions";
import {IRootState} from "../../store";

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
  show: boolean;
  onHide: () => void;
  click: () => void;
}

const Forms: React.FC<Props> = (props) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      props.deleteAllProduct();
      props.click();
    }
    setValidated(true);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Оформление заказа</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Имя"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Фамилия"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Адрес</Form.Label>
              <Form.Control type="text" placeholder="Адрес" required/>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom04">
              <Form.Label>Номер телефона</Form.Label>
              <Form.Control
                type="tel"
                pattern="^\d{11}$"
                placeholder="1-(111)-111-11-11"
                required/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Button type="submit">Купить</Button>
          </Form.Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state: IRootState) => ({
  products: state.store.products,
});

const mapDispatchToProps = (dispatch: any) => ({
  deleteAllProduct: () => dispatch(deleteAllProduct()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);

