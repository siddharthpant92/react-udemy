import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import ContactStyles from "./ContactData.module.css";
import axiosInstance from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your name",
        },
        value: "",
      },
      email: {
        elementType: "email",
        elementConfig: {
          type: "email",
          placeholder: "your email",
        },
        value: "",
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your address",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest",
            },
            {
              value: "cheapest",
              displayValue: "Cheapest",
            },
          ],
        },
        value: "",
      },
    },
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
      deliveryMethod: "fastest",
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
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let displayContent = (
      <form>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
          />
        ))}
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
