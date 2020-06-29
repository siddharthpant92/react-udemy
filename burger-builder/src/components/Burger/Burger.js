import React from "react";
import BurgerStyle from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  const ingredientsNamesArray = Object.keys(props.ingredients);
  let transformedIngredients = ingredientsNamesArray
    .map((ingredientName) => {
      // Converting each element into an array with the size specified as the value from key-value pair
      const tempArray = Array(props.ingredients[ingredientName]);
      return [...tempArray].map((_, index) => {
        return (
          <BurgerIngredient
            key={ingredientName + index}
            type={ingredientName}
          />
        );
      });
    })
    .reduce((arr, el) => {
      // Without the reduce function, we get an array of arrays, where each array element is an object.
      // The reduce function flattens it out to give us a single array of objects
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={BurgerStyle.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
