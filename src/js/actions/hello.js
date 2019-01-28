import { HELLO_WORLD,UPDATE_PRODUCTS } from '../action-types/action-type'


export function hello() {
    return { type: HELLO_WORLD }
};

export function updateProducts(payload) {
    return { type: UPDATE_PRODUCTS, payload }
};