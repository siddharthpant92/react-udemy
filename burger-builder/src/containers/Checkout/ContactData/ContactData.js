import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import ContactStyles from "./ContactData.module.css";
import axiosInstance from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: "",
    isLoading: false,
  };

  orderHandler = (event) => {
    this.setState({
      isLoading: true,
    });
    event.preventDefault();
    // baseUrl defined in axios-orders.js
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Sid",
        email: "sid@test.com",
      },
    };

    axiosInstance
      .post("/orders.json", order)
      .then((response) => {
        this.setState({
          isLoading: false,
        });
        /*
        See how props are passed from Checkout.js to ContactData.js
        */
       this.props.history.push("/")
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    let displayContent = (
      <form>
        <input
          className={ContactStyles.Input}
          type="text"
          name="name"
          placeholder="name"
        />
        <input
          className={ContactStyles.Input}
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          className={ContactStyles.Input}
          type="address"
          name="address"
          placeholder="address"
        />

        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.isLoading) {
      displayContent = <Spinner />;
    }

    return (
      <div className={ContactStyles.Contact}>
        <h4>Enter your contact details</h4>
        {displayContent}
      </div>
    );
  }
}

export default ContactData;
