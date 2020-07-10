import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData) => {
  return {
    type: actionTypes.INIT_PURCHASE_BURGER_SAGA,
    orderData: orderData
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchExistingOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_EXISTING_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchExistingOrdersError = (error) => {
  return {
    type: actionTypes.FETCH_EXISTING_ORDERS_FAIL,
    error: error,
  };
};

export const fetchExistingOrdersStart = () => {
  return {
    type: actionTypes.FETCH_EXISTING_ORDERS_START,
  };
};

export const fetchOrders = () => {
  return {
    type: actionTypes.FETCH_ALL_ORDERS_SAGA
  }
};
