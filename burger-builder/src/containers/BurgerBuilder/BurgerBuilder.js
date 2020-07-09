import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderConfirmed: false,
    };
  }

  componentDidMount() {
    // Valid lifecycle method for side affects like making an api call
    // Fetching the ingredients for a base burger for initial state
    this.props.onInitIngredients();
  }

  checkPurchesedState = () => {
    const ingredientsList = this.props.burgerBuilder.ingredients;
    const sum = Object.keys(ingredientsList)
      .map((ingredientName) => {
        return ingredientsList[ingredientName];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  continuePurchase = () => {
    this.props.onInitPurchase();
    this.setState({ orderConfirmed: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ orderConfirmed: false, firebaseRequestError: false });
  };

  purchaseConfirmHandler = () => {
    this.props.history.push("/checkout");
  };

  signInToOrderClickedHandler = () => {
    this.props.onSetRedirectPath("/checkout");
    this.props.history.push("/auth");
  };

  render() {
    // Finding out for which ingredients the 'Less' button should be disabled
    const disabledInfo = {
      ...this.props.burgerBuilder.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = null;

    if (!this.props.burgerBuilder.ingredients) {
      // Initially before the GET request to fetch ingredients hasn't completed, display the spinner
      burger = <Spinner />;
    } else {
      // Create the burger with the base ingredients fetched from firebase
      burger = (
        <Aux>
          <Burger ingredients={this.props.burgerBuilder.ingredients} />;
          <BuildControls
            addIngredient={
              (ingredientType) =>
                this.props.addIngredientHandler(ingredientType) // Getting a value passed back from BuildControls
            }
            removeIngredient={(ingredientType) =>
              this.props.removeIngredientHandler(ingredientType)
            }
            disabled={disabledInfo}
            price={this.props.burgerBuilder.totalPrice}
            purchasable={this.checkPurchesedState()}
            continuePurchase={this.continuePurchase}
            signInToOrderClicked={this.signInToOrderClickedHandler}
            isAuth={this.props.auth.token !== null}
          />
        </Aux>
      );
      // Creating thr OrderSummary component after we get the ingredients list
      orderSummary = (
        <OrderSummary
          ingredients={this.props.burgerBuilder.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseConfirmed={this.purchaseConfirmHandler}
          totalPrice={this.props.burgerBuilder.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <p style={{ textAlign: "center" }}>
          <a
            style={{ textAlign: "center" }}
            target="_blank"
            href="https://github.com/siddharthpant92/react-udemy"
          >
            {" "}
            Github repo link
          </a>
        </p>

        {this.props.burgerBuilder.firebaseRequestError ? (
          <ErrorModal
            show={this.props.burgerBuilder.firebaseRequestError}
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

const mapStateToProps = (state) => {
  return {
    burgerBuilder: { ...state.burgerBuilder },
    auth: { ...state.auth },
  };
};

const mapDispatchToProps = (dispatch) => ({
  addIngredientHandler: (ingredientName) =>
    dispatch(actions.addIngredient(ingredientName)),
  removeIngredientHandler: (ingredientName) =>
    dispatch(actions.removeIngredient(ingredientName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
