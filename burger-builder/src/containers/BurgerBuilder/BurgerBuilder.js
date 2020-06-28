import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 1,
  meat: 3,
  bacon: 2,
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0, // 2 slices of cheese
        meat: 0,
      },
      totalPrice: 4,
    };
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldTotal = this.state.totalPrice;
    const newTotal = oldTotal + priceAddition;

    this.setState({ ingredients: updatedIngredients, totalPrice: newTotal });
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount === 0) {
      alert("cannot remove " + type);
    }
    const updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldTotal = this.state.totalPrice;
    const newTotal = oldTotal - priceAddition;

    this.setState({ ingredients: updatedIngredients, totalPrice: newTotal });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={
            (ingredientType) => this.addIngredientHandler(ingredientType) // Getting a value passed back from BuildControls
          }
          removeIngredient={(ingredientType) =>
            this.removeIngredientHandler(ingredientType)
          }
          disabled={disabledInfo}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
