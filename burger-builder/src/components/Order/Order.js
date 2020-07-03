import React from "react";
import OrderStyle from "./Order.module.css";

const order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }
  console.log(ingredients);
  const ingredientDisplayContent = ingredients.map((ig) => (
    <span key={ig.name} style={{ textTransform: "capitalize", display:"inline-block", margin: "0 8px", border: '1px solid grey', padding: "5px" }}>
      {ig.name}: {ig.amount}
    </span>
  ));

  return (
    <div className={OrderStyle.Order}>
      <p>Ingredients: {ingredientDisplayContent}</p>
      <p>Price: {parseInt(props.totalPrice)}</p>
    </div>
  );
};

export default order;
