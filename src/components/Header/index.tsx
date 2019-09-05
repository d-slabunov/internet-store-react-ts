import React, {useCallback, useMemo, useState} from 'react';
import { Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import Basket from '../Basket';
import Forms from '../Form';
import FormPaid from '../FormPaid';
import { IRootState } from "../../store";
import { deleteAllProduct } from "../../store/actions";
import './style.scss';

const Header: React.FC<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> = (props) => {
  const [modalShowBasket, setModalShowBasket] = useState(false);
  const [modalShowOrder, setModalShowOrder] = useState(false);
  const [modalShowPaid, setModalShowPaid] = useState(false);
  const { products } = props;

  const price = useMemo(() => {
    let price = 0;
    products.forEach((item) => price += item.price * item.count);
    return price;
  }, [products]);

  const count = useMemo(() => {
    let count = 0;
    products.forEach((item) => count += item.count);
    return count
  }, [products]);

  const clickOnBasket = useCallback(() => {
    if (!price) {
        props.deleteAllProduct();
      }
      setModalShowBasket(!modalShowBasket);
    }, [setModalShowBasket, modalShowBasket, products]);

  const clickOnOrder = useCallback(() => {
      setModalShowBasket(false);
      setModalShowOrder(!modalShowOrder);
    }, [setModalShowBasket, setModalShowOrder, modalShowOrder]);

  const clickOnPaid = useCallback(() => {
    setModalShowOrder(false);
    setModalShowPaid(!modalShowPaid);
  }, [setModalShowPaid, modalShowPaid, setModalShowOrder]);

  return (
    <>
      <Navbar className="header" bg="dark" variant="dark">
        <Navbar.Brand href="#home">{'Пицца'}</Navbar.Brand>
        <div className="basket" onClick={() => clickOnBasket()}>
          <div className="basket__header">
            <FontAwesomeIcon icon={faTrashAlt}/>
            <div className="basket__header__title">Корзина</div>
          </div>
          <div className="basket__footer">
            <div>{count} | </div>
            <div>&nbsp;{price} ₽</div>
          </div>
        </div>
      </Navbar>
      <Basket click={() => clickOnOrder()} onHide={() => clickOnBasket()} show={modalShowBasket}/>
      <Forms click={() => clickOnPaid()} onHide={() => clickOnOrder()} show={modalShowOrder}/>
      <FormPaid onHide={() => clickOnPaid()} show={modalShowPaid}/>
    </>
  )
};

const mapStateToProps = (state: IRootState) => ({
  products: state.store.products,
});

const mapDispatchToProps = (dispatch: any) => ({
  deleteAllProduct: () => dispatch(deleteAllProduct()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
