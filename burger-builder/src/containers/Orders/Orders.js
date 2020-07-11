import React, { Component } from "react";
import Order from "../../components/Order/Order";
import * as actionTypes from "../../store/actions/indexActions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";

class Orders extends Component {
  componentWillMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;

    if (!this.props.order.loading) {
      if (this.props.order.orders.length > 0) {
        orders = this.props.order.orders.map((order) => {
          return (
            <Order
              key={order.id}
              totalPrice={order.price}
              ingredients={order.ingredients}
            />
          );
        });
      } else if (this.props.order.firebaseError) {
        orders = <ErrorModal show={true} />;
      } else {
        orders = <p>No existing orders</p>;
      }
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    order: { ...state.order },
  };
};
const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: () => dispatch(actionTypes.fetchOrders()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
