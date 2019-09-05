import React, { useState, useEffect } from 'react';
import {Navbar, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import Basket from "../Basket";
import './style.scss';

const Header: React.FC<ReturnType<typeof mapStateToProps>> = (props) => {
  const [modalShow, setModalShow] = useState(false);
  console.log("HEADER", props)

  const finalPrice = () => {
    let price = 0;
    props.products.forEach((item: any) => price += item.price * item.count);
    return price
  };

  const finalCount = () => {
    let count = 0;
    props.products.forEach((item: any) => count += item.count);
    return count
  };

  const clickOnBasket = () => {
    setModalShow(!modalShow);
  };

  return (
    <>
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
    <div className="basket" onClick={() => clickOnBasket()}>
  <div className="basket__header">
  <FontAwesomeIcon icon={faTrashAlt} />
  <div>Basket</div>
  </div>
  <div className="basket__footer">
    <div>{ finalCount() } | </div>
    <div>{ finalPrice()} rub</div>
  </div>
  </div>
  </Navbar>
  <Basket onHide={() => clickOnBasket()} show={modalShow}/>
  </>
)
};

const mapStateToProps = (state: any) => ({
  products: state.store.products,
});

export default connect(mapStateToProps)(Header);
