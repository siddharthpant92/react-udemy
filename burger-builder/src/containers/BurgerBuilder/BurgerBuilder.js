import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";

const BurgerBuilder = (props) => {
  const { onInitIngredients } = props;
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const checkPurchesedState = () => {
    const ingredientsList = props.burgerBuilder.ingredients;
    const sum = Object.keys(ingredientsList)
      .map((ingredientName) => {
        return ingredientsList[ingredientName];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const continuePurchase = () => {
    props.onInitPurchase();
    setOrderConfirmed(true);
  };

  const purchaseCancelHandler = () => {
    setOrderConfirmed(false);
  };

  const purchaseConfirmHandler = () => {
    props.history.push("/checkout");
  };

  const signInToOrderClickedHandler = () => {
    props.onSetRedirectPath("/checkout");
    props.history.push("/auth");
  };

  // Finding out for which ingredients the 'Less' button should be disabled
  const disabledInfo = {
    ...props.burgerBuilder.ingredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = null;

  if (!props.burgerBuilder.ingredients) {
    // Initially before the GET request to fetch ingredients hasn't completed, display the spinner
    burger = <Spinner />;
  } else {
    // Create the burger with the base ingredients fetched from firebase
    burger = (
      <Aux>
        <Burger ingredients={props.burgerBuilder.ingredients} />;
        <BuildControls
          addIngredient={
            (ingredientType) => props.addIngredientHandler(ingredientType) // Getting a value passed back from BuildControls
          }
          removeIngredient={(ingredientType) =>
            props.removeIngredientHandler(ingredientType)
          }
          disabled={disabledInfo}
          price={props.burgerBuilder.totalPrice}
          purchasable={checkPurchesedState()}
          continuePurchase={continuePurchase}
          signInToOrderClicked={signInToOrderClickedHandler}
          isAuth={props.auth.token !== null}
        />
      </Aux>
    );
    // Creating thr OrderSummary component after we get the ingredients list
    orderSummary = (
      <OrderSummary
        ingredients={props.burgerBuilder.ingredients}
        purchaseCancelled={purchaseCancelHandler}
        purchaseConfirmed={purchaseConfirmHandler}
        totalPrice={props.burgerBuilder.totalPrice}
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

      {props.burgerBuilder.firebaseRequestError ? (
        <ErrorModal
          show={props.burgerBuilder.firebaseRequestError}
          modalClosed={purchaseCancelHandler}
        />
      ) : (
        <Modal show={orderConfirmed} modalClosed={purchaseCancelHandler}>
          {orderSummary}
        </Modal>
      )}
      {burger}
    </Aux>
  );
};

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
