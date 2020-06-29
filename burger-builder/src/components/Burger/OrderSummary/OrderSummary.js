import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "./../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingredient) => {
    return (
      <li key={ingredient}>
        <span style={{ textTransform: "capitalize" }}>{ingredient}</span>:{" "}
        {props.ingredients[ingredient]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order</h3>
      <ul>{ingredientSummary}</ul>
      <p>Total Price: ${props.totalPrice.toFixed(2)}</p>
      <p>Continue Checkout?</p>
      <Button clicked={props.purchaseCancelled} btnType="Danger">
        Cancel
      </Button>
      <Button clicked={props.purchaseConfirmed} btnType="Success">
        Continue
      </Button>
    </Aux>
  );
};

export default orderSummary;
