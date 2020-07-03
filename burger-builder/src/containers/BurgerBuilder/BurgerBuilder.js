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
      ingredients: null,
      totalPrice: 9, //hard coded based on the ingredients stored in firebase
      purchasable: false,
      orderConfirmed: false,
      loading: false,
      firebaseRequestError: false,
    };
  }

  componentDidMount() {
    // Valid lifecycle method for side affects like making an api call
    // Fetching the ingredients for a base burger for initial state
    axiosInstance
      .get("/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
        this.checkPurchesedState();
      })
      .catch((error) => {
        console.log("componentDidMount ERROR: ", error);
        this.setState({
          loading: false,
          orderConfirmed: false,
          firebaseRequestError: true,
        });
      });
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
    this.setState({ orderConfirmed: false, firebaseRequestError: false });
  };

  purchaseConfirmHandler = () => {
    this.setState({ loading: true });
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + "=" + this.state.ingredients[i]);
    }
    queryParams.push("totalPrice=" + this.state.totalPrice);

    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: queryString,
      customProps: { totalPrice: this.state.totalPrice },
    });
  };

  render() {
    // Finding out for which ingredients the 'Less' button should be disabled
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = null;

    if (!this.state.ingredients) {
      // Initially before the GET request to fetch ingredients hasn't completed, display the spinner
      burger = <Spinner />;
    } else {
      // Create the burger with the base ingredients fetched from firebase
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />;
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
      // Creating thr OrderSummary component after we get the ingredients list
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseConfirmed={this.purchaseConfirmHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }

    return (
      <Aux>
        {this.state.firebaseRequestError ? (
          <ErrorModal
            show={this.state.firebaseRequestError}
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
        {burger}
      </Aux>
    );
  }
}

export default BurgerBuilder;
