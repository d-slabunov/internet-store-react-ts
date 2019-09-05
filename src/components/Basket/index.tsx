import React, { useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import './style.scss';

interface ModalsProps {
  data: { id: number; name: string, price: number, image: string, description: string };
  show: boolean;
  onHide: any;
}

const Modals: React.FC<ModalsProps> = (props) => {
  const { data, onHide} = props;

  return (
    <Modal
      {...props}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
  >
  <Modal.Header closeButton>
  <Modal.Title id="contained-modal-title-vcenter">
    { data.name }
    </Modal.Title>
    <img src={data.image} alt=""/>
    </Modal.Header>
    <Modal.Body>
    <h4>Description</h4>
    <p>{ data.description }</p>
    </Modal.Body>
    <Modal.Footer>
    <Modal.Title>Price {data.price}</Modal.Title>
  <Button onClick={onHide}>Add to Cart</Button>
  </Modal.Footer>
  </Modal>
)
};

export default Modals
