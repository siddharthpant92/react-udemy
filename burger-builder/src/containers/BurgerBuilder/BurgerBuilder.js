import React, { useState, useEffect, useCallback } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/indexActions";

const BurgerBuilder = (props) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const dispatch = useDispatch();
  const burgerBuilder = useSelector((state) => {
    return { ...state.burgerBuilder };
  });
  const auth = useSelector((state) => {
    return { ...state.auth };
  });

  const addIngredientHandler = (ingredientName) =>
    dispatch(actions.addIngredient(ingredientName));

  const removeIngredientHandler = (ingredientName) =>
    dispatch(actions.removeIngredient(ingredientName));

  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  );

  const onInitPurchase = () => dispatch(actions.purchaseInit());

  const onSetRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const checkPurchesedState = () => {
    const ingredientsList = burgerBuilder.ingredients;
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
    onInitPurchase();
    setOrderConfirmed(true);
  };

  const purchaseCancelHandler = () => {
    setOrderConfirmed(false);
  };

  const purchaseConfirmHandler = () => {
    props.history.push("/checkout");
  };

  const signInToOrderClickedHandler = () => {
    onSetRedirectPath("/checkout");
    props.history.push("/auth");
  };

  // Finding out for which ingredients the 'Less' button should be disabled
  const disabledInfo = {
    ...burgerBuilder.ingredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = null;

  if (!burgerBuilder.ingredients) {
    // Initially before the GET request to fetch ingredients hasn't completed, display the spinner
    burger = <Spinner />;
  } else {
    // Create the burger with the base ingredients fetched from firebase
    burger = (
      <Aux>
        <Burger ingredients={burgerBuilder.ingredients} />;
        <BuildControls
          addIngredient={
            (ingredientType) => addIngredientHandler(ingredientType) // Getting a value passed back from BuildControls
          }
          removeIngredient={(ingredientType) =>
            removeIngredientHandler(ingredientType)
          }
          disabled={disabledInfo}
          price={burgerBuilder.totalPrice}
          purchasable={checkPurchesedState()}
          continuePurchase={continuePurchase}
          signInToOrderClicked={signInToOrderClickedHandler}
          isAuth={auth.token !== null}
        />
      </Aux>
    );
    // Creating thr OrderSummary component after we get the ingredients list
    orderSummary = (
      <OrderSummary
        ingredients={burgerBuilder.ingredients}
        purchaseCancelled={purchaseCancelHandler}
        purchaseConfirmed={purchaseConfirmHandler}
        totalPrice={burgerBuilder.totalPrice}
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

      {burgerBuilder.firebaseRequestError ? (
        <ErrorModal
          show={burgerBuilder.firebaseRequestError}
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

export default BurgerBuilder;
