import React, {useMemo} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { setProduct, incCountProduct, decCountProduct, deleteProduct } from '../../store/actions';
import { IRootState } from "../../store";
import { IList } from "../../types";
import './style.scss';

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
  show: boolean;
  onHide: () => void;
  click: () => void;
}

const Basket: React.FC<Props> = (props) => {
  const { products, click } = props;

  const clickPlus = (item: IList) => {
    props.incCountProduct(item);
  };

  const clickMinus = (item: IList) => {
    props.decCountProduct(item);
  };

  const clickDelete = (item: IList) => {
    props.deleteProduct(item);
  };

  const price = useMemo(() => {
    let price = 0;
    products.forEach(item => price += item.price * item.count);
    return price;
  }, [products]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Корзина</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {products.length ? products.map((item) => {
          return (
            <div className="product">
              <div className="product__name">{item.name}</div>
              <div className="product__minus" onClick={() => clickMinus(item)}><FontAwesomeIcon icon={faMinus}/></div>
              <div className="product__count">{item.count}</div>
              <div className="product__plus" onClick={() => clickPlus(item)}><FontAwesomeIcon icon={faPlus}/></div>
              <div className="product__price">{item.price * item.count} ₽</div>
              <div className="product__delete" onClick={() => clickDelete(item)}><FontAwesomeIcon icon={faTimes}/></div>
            </div>
          )
        }) : <div>Добавьте что-нибудь из меню</div>}
      </Modal.Body>
      <Modal.Footer>
        <Modal.Title>Сумма заказа: {price} ₽</Modal.Title>
        <Button disabled={!price} onClick={click}>Оформить заказ</Button>
      </Modal.Footer>
    </Modal>
  )
};

const mapStateToProps = (state: IRootState) => ({
  products: state.store.products,
});

const mapDispatchToProps = (dispatch: any) => ({
  setProduct: (item: IList) => dispatch(setProduct(item)),
  decCountProduct: (item: IList) => dispatch(decCountProduct(item)),
  incCountProduct: (item: IList) => dispatch(incCountProduct(item)),
  deleteProduct: (item: IList) => dispatch(deleteProduct(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(Basket)

