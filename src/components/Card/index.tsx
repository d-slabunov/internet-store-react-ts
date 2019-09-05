import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { IList } from '../../types';
import './style.scss';

interface CardsProps {
  data: IList;
  openModal: () => void;
}

const Cards: React.FC<CardsProps> = (props) => {
  const {data, openModal} = props;

  return (
    <Card className="card">
      <div className="card__header">
        <Card.Img variant="top" className="card__image" src={data.image}/>
      </div>
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>{data.description}</Card.Text>
        <Container className="card__footer">
          <Card.Text className="card__footer__text">Цена: {data.price} ₽</Card.Text>
          <Button variant="primary" onClick={openModal}>Выбрать</Button>
        </Container>
      </Card.Body>
    </Card>
  )
};

export default Cards;
