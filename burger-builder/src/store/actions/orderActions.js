import * as actionTypes from "./actionTypes";
import axiosInstance from "../../axios-orders";

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

const purchaseBurgerFail = (error) => {
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
  return (dispatch) => {
    dispatch(purchaseBurgerStart());

    axiosInstance
      .post("/orders.json", orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        console.log("orderActions purchaseBurger error: ", error);
        dispatch(purchaseBurgerFail(error));
      });
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
  return (dispatch) => {
    dispatch(fetchExistingOrdersStart());
    axiosInstance
      .get("orders.json")
      .then((response) => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        dispatch(fetchExistingOrdersSuccess(fetchedOrders));
      })
      .catch((error) => {
        console.log("ordersAction fetchOrders ERROR: ", error);
        dispatch(fetchExistingOrdersError(error));
      });
  };
};
