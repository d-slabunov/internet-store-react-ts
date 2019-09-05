import React from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import { IList } from '../../types';
import './style.scss';

interface IProps {
  data: IList;
  onHide: () => void;
  click: () => void;
}

const ProductModal: React.FC<IProps> = (props) => {
  const { data, onHide, click} = props;

  return (
    <Modal
      show={true}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Container className="modal-container">
          <Container className="modal-container__left">
            <Modal.Title id="contained-modal-title-vcenter">
              { data.name }
            </Modal.Title>
            <img src={data.image} alt=""/>
          </Container>
          <Container className="modal-container__right">
            <Modal.Title>Описание</Modal.Title>
            <p>{ data.description }</p>
          </Container>
        </Container>
      </Modal.Header>
      <Modal.Footer>
        <Modal.Title>Цена {data.price} ₽</Modal.Title>
        <Button onClick={click}>Добавить в корзину</Button>
      </Modal.Footer>
    </Modal>
  )
};

export default ProductModal;
