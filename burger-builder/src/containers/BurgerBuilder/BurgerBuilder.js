import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
      purchasable: false,
      orderConfirmed: false,
    };
  }

  addIngredientHandler = (type) => {
    this.setState((prevState) => {
      const oldCount = prevState.ingredients[type];
      const updatedCount = oldCount + 1;

      const updatedIngredients = {
        ...prevState.ingredients,
      };
      updatedIngredients[type] = updatedCount;

      const priceAddition = INGREDIENT_PRICES[type];
      const oldTotal = prevState.totalPrice;
      const newTotal = oldTotal + priceAddition;

      return { ingredients: updatedIngredients, totalPrice: newTotal };
    });

    this.checkPurchesedState();
  };

  removeIngredientHandler = (type) => {
    this.setState((prevState) => {
      const oldCount = prevState.ingredients[type];
      if (oldCount === 0) {
        alert("cannot remove " + type);
      }
      const updatedCount = oldCount - 1;

      const updatedIngredients = {
        ...prevState.ingredients,
      };
      updatedIngredients[type] = updatedCount;

      const priceAddition = INGREDIENT_PRICES[type];
      const oldTotal = prevState.totalPrice;
      const newTotal = oldTotal - priceAddition;

      return { ingredients: updatedIngredients, totalPrice: newTotal };
    });

    this.checkPurchesedState();
  };

  checkPurchesedState = () => {
    // Reliable way to get previous state
    this.setState((prevState) => {
      const ingredients = { ...prevState.ingredients };

      const sum = Object.keys(ingredients)
        .map((ingredientName) => {
          return ingredients[ingredientName];
        })
        .reduce((sum, el) => {
          return sum + el;
        }, 0);
      return { purchasable: sum > 0 };
    });
  };

  continuePurchase = () => {
    this.setState({ orderConfirmed: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ orderConfirmed: false });
  };

  purchaseConfirmHandler = () => {
    alert("Confirmed");
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
        <Modal
          show={this.state.orderConfirmed}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseConfirmed={this.purchaseConfirmHandler}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={
            (ingredientType) => this.addIngredientHandler(ingredientType) // Getting a value passed back from BuildControls
          }
          removeIngredient={(ingredientType) =>
            this.removeIngredientHandler(ingredientType)
          }
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          continuePurchase={this.continuePurchase}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
