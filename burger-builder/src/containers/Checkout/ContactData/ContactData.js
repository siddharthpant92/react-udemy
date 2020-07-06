import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import ContactStyles from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";

import * as orderActions from "../../../store/actions/indexActions";

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
        validation: {
          required: true,
          valid: false,
        },
      },
      email: {
        elementType: "email",
        elementConfig: {
          type: "email",
          placeholder: "your email",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
        },
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your address",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
        },
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
        value: "fastest",
        validation: {
          required: true,
          valid: true,
        },
      },
    },
    isFormValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault(); // prevents reloading of page

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ]["value"];
    }

    // baseUrl defined in axios-orders.js
    const order = {
      ingredients: this.props.burgerBuilder.ingredients,
      price: this.props.burgerBuilder.totalPrice,
      orderData: formData,
    };
    console.log("contectdata orderHandler order: ", order)

    this.props.onOrderBurger(order);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.validation.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid =
        updatedOrderForm[inputIdentifier].validation.valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, isFormValid: formIsValid });
  };

  checkValidity = (value, rules) => {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== "";
    }

    return isValid;
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
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.validation.valid}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.isFormValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.order.orderLoading) {
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

const mapStateToProps = (state) => {
  return {
    burgerBuilder: { ...state.burgerBuilder },
    order: { ...state.order },
  };
};

const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (orderData) =>
    dispatch(orderActions.purchaseBurger(orderData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
