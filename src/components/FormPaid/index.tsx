import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export interface IProps {
  show: boolean;
  onHide: () => void;
}

const FormsPaid: React.FC<IProps> = (props) => {
  const {onHide} = props;

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
        Ваш заказ успешно оформлен, благодарим за покупку.
      </Modal.Body>
      <Modal.Footer>
          <Button onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormsPaid;
