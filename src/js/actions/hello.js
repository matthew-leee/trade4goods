import { HELLO_WORLD,UPDATE_PRODUCTS,UPDATE_FILTERARR,UPDATE_FILTERKEY,UPDATE_TRYLOGIN,UPDATE_TRYREG } from '../action-types/action-type'


export function hello() {
    return { type: HELLO_WORLD }
};

export function updateProducts(payload) {
    return { type: UPDATE_PRODUCTS, payload }
};

export function updateFilterArr(payload) {
    return { type: UPDATE_FILTERARR, payload }
};

export function updateFilterKey(payload) {
    return { type: UPDATE_FILTERKEY, payload }
};
export function handleLoginToggle(payload) {
    return { type: UPDATE_TRYLOGIN, payload }
};
export function handleRegToggle(payload) {
    return { type: UPDATE_TRYREG, payload }
};