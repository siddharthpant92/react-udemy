import React, { Component } from "react";
import Order from "../../components/Order/Order";
import * as actionTypes from "../../store/actions/indexActions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  // state = {
  //   orders: [],
  //   loading: true,
  // };

  componentWillMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      if (this.props.orders.length > 0) {
        orders = this.props.orders.map((order) => {
          return (
            <Order
              key={order.id}
              totalPrice={order.price}
              ingredients={order.ingredients}
            />
          );
        });
      } else {
        orders = <p>No existing orders</p>;
      }
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  console.log(state.order);
  return {
    ...state.order,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: () => dispatch(actionTypes.fetchOrders()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
