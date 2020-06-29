import React from "react";
import Aux from "../../../hoc/Aux";

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
      <p>Continue Checkout</p>
    </Aux>
  );
};

export default orderSummary;
