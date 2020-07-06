import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  orderLoading: false,
  purchased: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        orderLoading: true,
      };

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        orderLoading: false,
        purchased: true,
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return { ...state, orderLoading: false };

    case actionTypes.PURCHASE_INIT:
      return { ...state, purchased: false };

    case actionTypes.FETCH_EXISTING_ORDERS_START:
      return { ...state, orderLoading: true };

    case actionTypes.FETCH_EXISTING_ORDERS_SUCCESS:
      return { ...state, orders: action.orders, orderLoading: false };

    case actionTypes.FETCH_EXISTING_ORDERS_FAIL:
      return { ...state, orderLoading: true };

    default:
      return state;
  }
};
