import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import ContactStyles from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";

import * as orderActions from "../../../store/actions/indexActions";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
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
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault(); // prevents reloading of page

    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] =
        orderForm[formElementIdentifier]["value"];
    }

    const order = {
      ingredients: props.burgerBuilder.ingredients,
      price: props.burgerBuilder.totalPrice,
      orderData: formData,
    };

    props.onOrderBurger(order);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm,
    };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.validation.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid =
        updatedOrderForm[inputIdentifier].validation.valid && formIsValid;
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const checkValidity = (value, rules) => {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== "";
    }

    return isValid;
  };

  const formElementArray = [];
  for (let key in orderForm) {
    formElementArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let displayContent = (
    <form onSubmit={orderHandler}>
      {formElementArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.validation.valid}
          changed={(event) => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        Order
      </Button>
    </form>
  );
  if (props.order.orderLoading) {
    displayContent = <Spinner />;
  }

  return (
    <div className={ContactStyles.Contact}>
      <p>
        Note: no real custom validation checking for input fields. Only
        placeholder validation done. See code. Don't care about part. Focusing
        more on react stuff
      </p>
      <h4>Enter your contact details</h4>
      {displayContent}
    </div>
  );
};

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
