import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("orders.json")
      .then((response) => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key] ,
          id: key});
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((error) => {
        console.log("Orders componentDidMount ERROR: ", error);
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => {
          return <Order key={order.id} totalPrice={order.price} ingredients={order.ingredients} />
        })}
      </div>
    );
  }
}

export default Orders;
