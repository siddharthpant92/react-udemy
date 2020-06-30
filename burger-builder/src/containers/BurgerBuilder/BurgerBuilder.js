import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";

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
      loading: false,
      saveOrderError: false,
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
    console.log("purchaseCancelHandler");
    this.setState({ orderConfirmed: false, saveOrderError: false });
  };

  purchaseConfirmHandler = () => {
    this.setState({ loading: true });
    // baseUrl defined in axios-orders.js
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Sid",
        email: "sid@test.com",
      },
    };

    axiosInstance
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, orderConfirmed: false });
        console.log(response);
      })
      .catch((error) => {
        this.setState({
          loading: false,
          orderConfirmed: false,
          saveOrderError: true,
        });
        console.log("ERROR: ", error);
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseConfirmed={this.purchaseConfirmHandler}
        totalPrice={this.state.totalPrice}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        {this.state.saveOrderError ? (
          <ErrorModal
            show={this.state.saveOrderError}
            modalClosed={this.purchaseCancelHandler}
          />
        ) : (
          <Modal
            show={this.state.orderConfirmed}
            modalClosed={this.purchaseCancelHandler}
          >
            {orderSummary}
          </Modal>
        )}
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
