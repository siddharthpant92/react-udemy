import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderConfirmed: false,
      loading: false,
      firebaseRequestError: false,
    };
  }

  // componentDidMount() {
  //   // Valid lifecycle method for side affects like making an api call
  //   // Fetching the ingredients for a base burger for initial state
  //   axiosInstance
  //     .get("/ingredients.json")
  //     .then((response) => {
  //       this.setState({ ingredients: response.data });
  //       this.checkPurchesedState();
  //     })
  //     .catch((error) => {
  //       console.log("componentDidMount ERROR: ", error);
  //       this.setState({
  //         loading: false,
  //         orderConfirmed: false,
  //         firebaseRequestError: true,
  //       });
  //     });
  // }

  checkPurchesedState = () => {
    const ingredientsList = this.props.ingredients;
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
    this.setState({ orderConfirmed: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ orderConfirmed: false, firebaseRequestError: false });
  };

  purchaseConfirmHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    // Finding out for which ingredients the 'Less' button should be disabled
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = null;

    if (!this.props.ingredients) {
      // Initially before the GET request to fetch ingredients hasn't completed, display the spinner
      burger = <Spinner />;
    } else {
      // Create the burger with the base ingredients fetched from firebase
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />;
          <BuildControls
            addIngredient={
              (ingredientType) =>
                this.props.addIngredientHandler(ingredientType) // Getting a value passed back from BuildControls
            }
            removeIngredient={(ingredientType) =>
              this.props.removeIngredientHandler(ingredientType)
            }
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.checkPurchesedState()}
            continuePurchase={this.continuePurchase}
          />
        </Aux>
      );
      // Creating thr OrderSummary component after we get the ingredients list
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseConfirmed={this.purchaseConfirmHandler}
          totalPrice={this.props.totalPrice}
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

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addIngredientHandler: (ingredientName) =>
    dispatch({
      type: actionTypes.ADD_INGREDEIENT,
      ingredientName: ingredientName,
    }),
  removeIngredientHandler: (ingredientName) =>
    dispatch({
      type: actionTypes.REMOVE_INGREDEIENT,
      ingredientName: ingredientName,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
