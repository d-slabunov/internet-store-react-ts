import { IList } from '../types';

export const setProduct = (payload: IList) => ({
    type: 'SET_PRODUCT',
    payload
});

export const incCountProduct = (payload: IList) => ({
    type: 'INC_COUNT_PRODUCT',
    payload
});

export const decCountProduct = (payload: IList) => ({
    type: 'DEC_COUNT_PRODUCT',
    payload
});

export const deleteProduct = (payload: IList) => ({
    type: 'DELETE_PRODUCT',
    payload
});

export const deleteAllProduct = () => ({
    type: 'DELETE_ALL_PRODUCT',

});
