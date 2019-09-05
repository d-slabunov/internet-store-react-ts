import { IList } from "../types";

const init: IList[] = JSON.parse(localStorage.getItem("products") || '[]');

export interface IStoreReducer {
  products: IList[];
}

const initialState: IStoreReducer = {
  products: init,
};

const store = (state = initialState, action: any ): IStoreReducer => {
  switch (action.type) {
    case 'SET_PRODUCT':
      localStorage.setItem("products", JSON.stringify([ ...state.products, { ...action.payload, count: 1 } ]));
      return { products: [ ...state.products, { ...action.payload, count: 1 } ] };

    case 'INC_COUNT_PRODUCT':
      const incPizza = state.products.find(({id}) => id === action.payload.id);
      if (incPizza) {
        incPizza.count = incPizza.count + 1;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
      return { products: [...state.products] };

    case 'DEC_COUNT_PRODUCT':
      const decPizza = state.products.find(({id}) => id === action.payload.id);
      if (decPizza && decPizza.count > 0) {
        decPizza.count = decPizza.count - 1;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
      return { products: [...state.products] };

    case 'DELETE_PRODUCT':
      const delPizza = state.products.filter(({id}) => id !== action.payload.id);
      localStorage.setItem("products", JSON.stringify(delPizza));
      return { products: delPizza };

    case 'DELETE_ALL_PRODUCT':
      localStorage.removeItem("products");
      return { products: [] };

    default:
      return state
  }
};

export default store
