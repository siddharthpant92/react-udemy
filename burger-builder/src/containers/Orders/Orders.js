import React, { useEffect } from "react";
import Order from "../../components/Order/Order";
import * as actionTypes from "../../store/actions/indexActions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";

const Orders = (props) => {
  const { onFetchOrders } = props;
  // Mimicing componentDidMount
  useEffect(() => {
    onFetchOrders();
  }, [onFetchOrders]);

  let orders = <Spinner />;

  if (!props.order.loading) {
    if (props.order.orders.length > 0) {
      orders = props.order.orders.map((order) => {
        return (
          <Order
            key={order.id}
            totalPrice={order.price}
            ingredients={order.ingredients}
          />
        );
      });
    } else if (props.order.firebaseError) {
      orders = <ErrorModal show={true} />;
    } else {
      orders = <p>No existing orders</p>;
    }
  }

  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    order: { ...state.order },
  };
};
const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: () => dispatch(actionTypes.fetchOrders()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
