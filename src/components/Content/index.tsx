import React, {useState, useEffect, useCallback} from 'react';
import { Container, InputGroup, FormControl, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setProduct, incCountProduct } from '../../store/actions';
import Cards from '../Card';
import ProductModal from '../ProductModal';
import axios from 'axios';
import { IList } from '../../types';
import { IRootState } from "../../store";
import './style.scss';

const Content: React.FC<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> = (props) => {
  const [list, setList] = useState<IList[]>([]);
  const [filterList, setFilterList] = useState<IList[]>([]);
  const [selectedItem, setSelectedItem] = useState<IList | null>(null);

  useEffect(() => {
    axios.get('/catalog.json')
      .then(res => {
        setList(res.data);
        setFilterList(sortOnName(res.data));
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const clickItem = useCallback((item: IList) => setSelectedItem(item), [setSelectedItem]);

  const closeModal = () => {
    setSelectedItem(null)
  };

  const addToBasket = () => {
    if (!selectedItem) {
      return;
    }

    const isExist = props.products.find(({id}) => id === selectedItem.id);

    isExist ? props.incCountProduct(selectedItem) : props.setProduct(selectedItem);
    setSelectedItem(null);
  };

  const filterSearch = (e: any) => {
    const value = e.target.value;
    if (value) {
      const newList = list.filter((item) => {
        return item.name.toLowerCase().match(value.toLowerCase());
      });
      setFilterList(newList);
    } else {
      setFilterList(list);
    }
  };

  const sortOnName = (products: IList[]) => {
    return [...products].sort((a, b) => {
      const nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
      if (nameA < nameB)
        return -1;
      if (nameA > nameB)
        return 1;
      return 0
    })
  };

  const changeSortType = (e: any) => {
    const value = e.target.value;
    let newArray: IList[] = [];

    switch (value) {
      case 'textUp': newArray = sortOnName(filterList);
        break;
      case 'textDown': newArray = sortOnName(filterList).reverse();
        break;
      case 'priceUp': newArray = [...filterList].sort((a, b) => {return a.price - b.price});
        break;
      case 'priceDown': newArray = [...filterList].sort((a, b) => {return b.price - a.price});
        break;
      default: newArray = list;
    }
    setFilterList([...newArray]);
  };

  return (
    <Container className="content">
      <Container className="content-filter">
        <Container className="content-filter__left">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">Поиск</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                         onChange={filterSearch}/>
          </InputGroup>
        </Container>
        <Container className="content-filter__right">
          <Form.Group controlId='select-control'>
            <Form.Control as='select' onChange={changeSortType}>
              <option value='textUp'>По названию &#11014;</option>
              <option value='textDown'>По названию &#11015;</option>
              <option value='priceUp'>По цене &#11014;</option>
              <option value='priceDown'>По цене &#11015;</option>
            </Form.Control>
          </Form.Group>
        </Container>
      </Container>
      <Container className="content__item">
        {filterList.map((item, i) => <Cards data={item} key={i} openModal={() => clickItem(item)}/>)}
      </Container>
      {selectedItem &&
        <ProductModal
          onHide={closeModal}
          click={addToBasket}
          data={selectedItem}
        />
      }
    </Container>
  )
};

const mapStateToProps = (state: IRootState) => ({
  products: state.store.products,
});

const mapDispatchToProps = (dispatch: any) => ({
  setProduct: (item: IList) => dispatch(setProduct(item)),
  incCountProduct: (item: IList) => dispatch(incCountProduct(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content)

